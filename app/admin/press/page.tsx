'use client';

import React, { useState, useEffect } from 'react';
import SortablePressItems, {
  PressItem,
} from '@/app/components/SortablePressItems';
import { toast } from 'react-hot-toast';

export default function PressManagement() {
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch press items including drafts
  useEffect(() => {
    const fetchPressItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/press?drafts=true');
        if (!response.ok) {
          throw new Error('Failed to fetch press items');
        }
        const result = await response.json();
        setPressItems(result.data || []);
      } catch (err) {
        console.error('Error fetching press items:', err);
        setError('Failed to load press items');
      } finally {
        setLoading(false);
      }
    };

    fetchPressItems();
  }, []);

  // Handle reordering of press items
  const handleOrderChange = async (reorderedItems: PressItem[]) => {
    try {
      const response = await fetch('/api/press/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: reorderedItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      setPressItems(reorderedItems);
      toast.success('Press items reordered successfully');
    } catch (err) {
      console.error('Error updating press items order:', err);
      toast.error('Failed to update order');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Press Items Management</h1>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Manage Press Item Order</h2>
          <a
            href='/admin'
            className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm'
          >
            Back to Admin
          </a>
        </div>

        {loading ? (
          <div className='py-8 text-center'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
            <p className='mt-2'>Loading press items...</p>
          </div>
        ) : error ? (
          <div className='p-4 bg-red-50 text-red-600 rounded-md'>{error}</div>
        ) : pressItems.length === 0 ? (
          <div className='p-4 bg-yellow-50 text-yellow-700 rounded-md'>
            No press items found. Please add some press items first.
          </div>
        ) : (
          <>
            <p className='mb-4 text-gray-600'>
              Drag and drop items to reorder them. The order will be saved
              automatically.
            </p>
            <SortablePressItems
              items={pressItems}
              onOrderChange={handleOrderChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
