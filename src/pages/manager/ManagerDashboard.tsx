import React, { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import PerformanceMetrics from '../../components/manager/performance/PerformanceMetrics';
import ClientAllocationList from '../../components/manager/clients/ClientAllocationList';
import CommissionReport from '../../components/manager/reports/CommissionReport';
import { moneyManagerService } from '../../lib/services/moneyManagerService';
import { ClientAllocation, CommissionRecord, ManagerPerformance } from '../../lib/types/moneyManager';

const ManagerDashboard = () => {
  const [allocations, setAllocations] = useState<ClientAllocation[]>([]);
  const [commissions, setCommissions] = useState<CommissionRecord[]>([]);
  const [performance, setPerformance] = useState<ManagerPerformance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Replace with actual manager ID
        const managerId = 'manager123';
        
        // Update performance metrics
        await moneyManagerService.updatePerformance(managerId);
        
        // Calculate commissions
        const newCommissions = await moneyManagerService.calculateCommissions(managerId);
        setCommissions(newCommissions);
        
        // Generate report for current month
        const report = await moneyManagerService.generateReport(
          managerId,
          new Date().toISOString().slice(0, 7)
        );
        
        setAllocations(report.clientPerformance.map(cp => ({
          id: cp.clientId,
          clientId: cp.clientId,
          managerId,
          allocationAmount: cp.allocation,
          currentValue: cp.allocation + cp.pnl,
          pnl: cp.pnl,
          commissionPaid: cp.commission,
          startDate: new Date(),
          status: 'active'
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModifyAllocation = (allocationId: string) => {
    // TODO: Implement allocation modification
    console.log('Modify allocation:', allocationId);
  };

  const handleMarkCommissionPaid = async (commissionId: string) => {
    // TODO: Implement marking commission as paid
    console.log('Mark commission paid:', commissionId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Money Manager Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your managed accounts and performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Clients
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {allocations.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Assets Under Management
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ${allocations
                      .reduce((sum, a) => sum + a.currentValue, 0)
                      .toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total P/L
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ${allocations
                      .reduce((sum, a) => sum + a.pnl, 0)
                      .toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      {performance && <PerformanceMetrics performance={performance} />}

      {/* Client Allocations */}
      <ClientAllocationList
        allocations={allocations}
        onModify={handleModifyAllocation}
      />

      {/* Commission Report */}
      <CommissionReport
        commissions={commissions}
        onMarkPaid={handleMarkCommissionPaid}
      />
    </div>
  );
};

export default ManagerDashboard;