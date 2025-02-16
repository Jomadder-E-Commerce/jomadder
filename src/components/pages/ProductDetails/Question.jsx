'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

export default function Question() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(false);

  const questionData = [
    {
      name: 'Hasina',
      date: '2 days ago',
      question:
        'Get specific details about this product from customers who own it.',
      answer: 'ok afa',
    },
    {
      name: 'Kader',
      date: '2 days ago',
      question: 'Amra product nea palaia jabo na',
      answer: 'Age nijhe pola',
    },
  ];

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };
  const toggleAddQuestions = () => {
    setShowAddQuestions(!showAddQuestions);
  };

  return (
    <div>
      <div className="w-full border p-3">
        <div className='flex'>
          <h4 onClick={toggleQuestions} className="cursor-pointer">
            Questions ({questionData.length})
          </h4>
          {showQuestions && (
            <button
              className="text-sm text-primary ms-1 underline"
              onClick={toggleAddQuestions}
            >
              Ask Question
            </button>
          )}
        </div>
        {showQuestions && (
          <div className="">
            <div className="mt-3">
              {questionData.map((data, index) => (
                <div className="my-5" key={index}>
                  <p>Q: {data.question}</p>
                  <p>A: {data.answer}</p>
                  <div className="flex gap-3">
                    <p>
                      By{' '}
                      <span className="text-[#3749bb] font-semibold">
                        {data.name}
                      </span>
                    </p>
                    <div>
                      <p>{data.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!showAddQuestions && (
              <button
                className="text-sm text-primary ms-1 underline"
                onClick={toggleAddQuestions}
              >
                Ask Question
              </button>
            )}
            </div>
            {showAddQuestions && (
            <div>
              <Textarea
                placeholder="Write a Question"
                className="mt-3 w-[500px] mb-3"
              />
              <Button>Add a Review</Button>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
