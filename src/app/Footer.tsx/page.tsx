import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white mt-7 border-t border-gray-200 px-6 sm:px-10 py-4 text-sm text-gray-900">
      <div className="  mx-auto w-full max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-center sm:text-left">
         বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div className="text-center sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}