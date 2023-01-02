import Link from 'next/link';
import React from 'react';

type Props= {
    category: string;
    isActive: boolean;
}

export default function NavLink({category, isActive}:Props) {
  return (
  <Link href={`/news/${category}`}
  className={`navLink ${isActive && 'underline decoration-orange-400 underline-offset-4 font-bold text-lg'} space-x-2`}>
{category}
  </Link>
  );
}
