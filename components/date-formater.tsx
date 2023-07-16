'use client';

import { useEffect, useState } from 'react';

export function DateFormater({ date }: { date: Date }) {
  const [formatedDate, setFormatedDate] = useState('');

  useEffect(() => {
    setFormatedDate(new Intl.DateTimeFormat().format(date));
  }, [date]);

  return <>{formatedDate}</>;
}
