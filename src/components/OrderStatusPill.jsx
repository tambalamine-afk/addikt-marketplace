import { ORDER_STATUS } from '../lib/orders';

export default function OrderStatusPill({ status }) {
  const { label, className } = ORDER_STATUS[status] || ORDER_STATUS.pending;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide whitespace-nowrap ${className}`}
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      {label}
    </span>
  );
}
