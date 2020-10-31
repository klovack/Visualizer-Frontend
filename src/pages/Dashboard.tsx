import { Flex } from '@chakra-ui/core';
import React from 'react'
import { ChartCard } from '../components/ChartCard'
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

        <Flex justify="stretch">
          <ChartCard
            data={[]}
          />
          <ChartCard
            data={[]}
          />
        </Flex>

      </div>
    </div>
  );
}