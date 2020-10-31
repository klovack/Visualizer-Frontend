import React from 'react'
import { useSelector } from 'react-redux';
import { ChartCard } from '../components/ChartCard'
import { FilterForm } from '../components/FilterForm'
import { Filter } from '../models/filter';
import { Journey } from '../models/journey';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const filter: Filter = useSelector(state => state['filter']);
  const journeys: Journey[] = useSelector(state => state['journeys']);
  
  return (
    <div>
      <div className="wrapper dashboard">
        <FilterForm
          title="Refine the data you want to visualize"
          subtitle="Filter by vendors and time"
        />

        <div className="dashboard__top-chart">
          <ChartCard
            data={journeys}
            keys={['distance']}
            filter={filter}
            title="Total distance covered"
            totalKey="distance"
            totalUnit="km"
            indexBy="timeSpan"
          />
          <ChartCard
            data={journeys}
            keys={['fare_amount']}
            filter={filter}
            title="Total fares collected"
            totalKey="fare_amount"
            totalUnit="€"
            indexBy="timeSpan"
          />
        </div>

      </div>
    </div>
  );
}