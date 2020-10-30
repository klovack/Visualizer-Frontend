import React from 'react'
import { FilterForm } from '../components/FilterForm'

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      <div className="wrapper dashboard">
        <FilterForm
          title="Refine the data you want to visualize"
          subtitle="Filter by vendors and time"
        />
      </div>
    </div>
  );
}