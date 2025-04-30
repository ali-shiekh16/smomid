'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Define press item interface
export interface PressItem {
  id: number;
  title: string;
  subtitle: string;
  text?: string | null;
  image: string;
  date?: string | null;
  btnText: string;
  link?: string | null;
  itemType?: string;
  published: boolean;
  order?: number | null;
}

interface SortablePressItemProps {
  item: PressItem;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
}

// Component for a single sortable press item
const SortablePressItem = ({
  item,
  onEdit,
  onDelete,
  onPublish,
}: SortablePressItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='border p-4 mb-3 rounded-md bg-white shadow-sm flex items-center gap-3'
    >
      {/* Drag handle */}
      <div
        className='text-gray-400 self-stretch flex items-center cursor-grab'
        {...attributes}
        {...listeners}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='4' y1='10' x2='20' y2='10'></line>
          <line x1='4' y1='14' x2='20' y2='14'></line>
          <line x1='4' y1='18' x2='20' y2='18'></line>
          <line x1='4' y1='6' x2='20' y2='6'></line>
        </svg>
      </div>

      {/* Item thumbnail */}
      {item.image && (
        <div className='w-12 h-12 flex-shrink-0'>
          <img
            src={item.image}
            alt={item.title}
            className='w-full h-full object-cover rounded'
          />
        </div>
      )}

      {/* Item content */}
      <div className='flex-grow'>
        <h3 className='font-medium text-black'>{item.title}</h3>
      </div>

      {/* Published status */}
      <div
        className={`px-2 py-1 text-xs rounded-full ${
          item.published
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {item.published ? 'Published' : 'Draft'}
      </div>

      {/* Action buttons */}
      <div className='flex space-x-3'>
        {onEdit && (
          <button
            onClick={() => onEdit(item.id)}
            className='text-indigo-600 hover:text-indigo-900'
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className='text-red-600 hover:text-red-900'
          >
            Delete
          </button>
        )}
        {!item.published && onPublish && (
          <button
            onClick={() => onPublish(item.id)}
            className='text-green-600 hover:text-green-900'
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

interface SortablePressItemsProps {
  items: PressItem[];
  onOrderChange: (items: PressItem[]) => Promise<void> | void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
}

const SortablePressItems = ({
  items,
  onOrderChange,
  onEdit,
  onDelete,
  onPublish,
}: SortablePressItemsProps) => {
  const [pressItems, setPressItems] = useState<PressItem[]>([]);

  useEffect(() => {
    // Sort items by order first if available
    const sortedItems = [...items].sort((a, b) => {
      if (a.order !== null && b.order !== null) {
        return (a.order || 0) - (b.order || 0);
      }
      return 0;
    });
    setPressItems(sortedItems);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Only activate after dragging 8px to avoid accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPressItems(currentItems => {
        const oldIndex = currentItems.findIndex(item => item.id === active.id);
        const newIndex = currentItems.findIndex(item => item.id === over.id);

        // Reorder the array
        const newItems = arrayMove(currentItems, oldIndex, newIndex);

        // Update order values based on the new positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          order: index, // Set the order based on array index
        }));

        // Call the callback to save the new order
        onOrderChange(updatedItems);

        return updatedItems;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pressItems.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className='space-y-0'>
          {pressItems.map(item => (
            <SortablePressItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onPublish={onPublish}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortablePressItems;
