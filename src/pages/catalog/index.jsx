import React from 'react';
import { Link } from 'react-router-dom';

const catalogPages = [
  { title: 'Ballon Hampers', path: '/catalog/ballon-hampers' },
  { title: 'Ballon Hampers with Gifts', path: '/catalog/ballon-hampers-with-gifts' },
  { title: 'Rose Bunches', path: '/catalog/rose-bunches' },
  { title: 'Flower Bunches', path: '/catalog/flower-bunches' },
  { title: 'Cake with Flower Bunch', path: '/catalog/cake-with-flower-bunch' },
  { title: 'Cakes', path: '/catalog/cakes' },
  { title: 'Brownies', path: '/catalog/brownies' },
  { title: 'Brownies with Gifts', path: '/catalog/brownies-with-gifts' },
  { title: 'Teddies', path: '/catalog/teddies' },
  { title: 'Money Bunches', path: '/catalog/money-bunches' },
];

const CatalogIndex = () => (
  <main className="min-h-screen bg-gray-50 py-10">
    <section className="mx-auto max-w-5xl space-y-6 rounded-3xl bg-white p-8 shadow-lg">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Catalog Sections</h1>
        <p className="mt-3 text-gray-600">Select a category to explore the special collections in our catalog.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {catalogPages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="rounded-3xl border border-gray-200 bg-rose-50 px-5 py-6 text-lg font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </section>
  </main>
);

export default CatalogIndex;
