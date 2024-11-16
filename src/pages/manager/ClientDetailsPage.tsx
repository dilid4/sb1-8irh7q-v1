import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { moneyManagerService } from '../../lib/services/moneyManagerService';
import ClientReport from '../../components/manager/reports/ClientReport';
import ModifyAllocationModal from '../../components/manager/clients/ModifyAllocationModal';
import { ClientAllocation } from '../../lib/types/moneyManager';

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [allocation, setAllocation] = useState<ClientAllocation | null>(null);
  const [monthlyReturns, setMonthlyReturns] = useState<Record<string, number>>({});
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Replace with actual manager ID
        const managerId = 'manager123';
        
        // Generate report for this client
        const report = await moneyManagerService.generateReport(
          managerId,
          new Date().toISOString().slice(0, 7)
        );
        
        const clientData = report.clientPerformance.find(cp => cp.clientId === clientId);
        if (clientData) {
          setAllocation({
            id: clientId!,
            clientId: clientId!,
            managerId,
            allocationAmount: clientData.allocation,
            currentValue: clientData.allocation + clientData.pnl,
            pnl: clientData.pnl,
            commissionPaid: clientData.commission,
            startDate: new Date(),
            status: 'active'
          });
        }

        // Get monthly returns
        const manager = await moneyManagerService.getManagerData(managerId);
        setMonthlyReturns(manager.performance.monthlyReturns);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  const handleModifyAllocation = async (data: any) => {
    try {
      // TODO: Implement allocation modification
      console.log('Modifying allocation:', data);
      setShowModifyModal(false);
    } catch (error) {
      console.error('Failed to modify allocation:', error);
    }
  };

  const handleDownloadReport = () => {
    // TODO: Implement report download
    console.log('Downloading report...');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!allocation) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Client #{clientId}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Client performance and allocation details
          </p>
        </div>
        <button
          onClick={() => setShowModifyModal(true)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Modify Allocation
        </button>
      </div>

      <ClientReport
        allocation={allocation}
        monthlyReturns={monthlyReturns}
        onDownload={handleDownloadReport}
      />

      {showModifyModal && (
        <ModifyAllocationModal
          allocation={allocation}
          onModify={handleModifyAllocation}
          onClose={() => setShowModifyModal(false)}
        />
      )}
    </div>
  );
};

export default ClientDetailsPage;