import React from 'react';

interface Props {
  name: string;
  attendance: string[];
}

const AttendanceRow = ({ name, attendance }: Props) => {
  return (
    <tr className='border-2 border-white'>
      <td className='border-1 border-white p-2'>{name}</td>
      {attendance.map(item => (
        <td className='border-1 border-white p-2'>{item}</td>
      ))}
    </tr>
  );
};

const data = [
  {
    name: 'Danish',
    attendance: ['P', 'A', 'P', 'A', 'P', 'A'],
  },
  {
    name: 'Ali',
    attendance: ['P', 'A', 'P', 'A', 'P', 'A'],
  },
  {
    name: 'Smith',
    attendance: ['P', 'A', 'P', 'P', 'A', 'A'],
  },
  {
    name: 'John',
    attendance: ['P', 'A', 'A', 'P', 'P', 'A'],
  },
  {
    name: 'Marry',
    attendance: ['A', 'A', 'P', 'P', 'A', 'A'],
  },
];

const AttendanceSheet = () => {
  return (
    <table className='border-2 border-white'>
      <tr className='border-2 border-white'>
        <td className='border-1 border-white p-2'>Student Name</td>
        <td className='border-1 border-white p-2'>Monday</td>
        <td className='border-1 border-white p-2'>Tuesday</td>
        <td className='border-1 border-white p-2'>Wednesday</td>
        <td className='border-1 border-white p-2'>Thursday</td>
        <td className='border-1 border-white p-2'>Friday</td>
        <td className='border-1 border-white p-2'>Saturday</td>
      </tr>
      {data.map(student => (
        <AttendanceRow name={student.name} attendance={student.attendance} />
      ))}
      {/* <AttendanceRow name='Ali' attendance={['P', 'A', 'P', 'P', 'P', 'A']} /> */}
    </table>
  );
};

export default AttendanceSheet;
