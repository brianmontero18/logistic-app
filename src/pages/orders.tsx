import { AppHeader } from "@/components/layout/AppHeader";
import { OrdersPageContent } from "@/components/orders/OrdersPageContent";
import { UI } from "@/constants/pagination";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className={`${UI.MAX_CONTENT_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <OrdersPageContent />
      </main>
    </div>
  );
} 