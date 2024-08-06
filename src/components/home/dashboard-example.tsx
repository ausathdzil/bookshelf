import DashboardCardExample from '@/components/home/dashboard-card-example';
import DashboardChartExample from '@/components/home/dashboard-chart-example';

export default function DashboardExample() {
  return (
    <section className="w-full flex gap-4 px-36">
      <div className="w-1/2 space-y-4">
        <DashboardCardExample />
      </div>
      <div className="w-1/2">
        <DashboardChartExample />
      </div>
    </section>
  );
}
