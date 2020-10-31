import { Box, Flex, FormLabel, Heading, List, ListIcon, ListItem, Switch } from '@chakra-ui/core';
import { ResponsiveBar, } from '@nivo/bar';
import React, { useState } from 'react'
import { Filter } from '../models/filter';

import { visualizerLegends } from '../shared/nivo-bar-themes';

interface ChartCardProps {
  title?: string,
  data: object[],
  keys?: string[],
  indexBy?: string,
  totalKey?: string,
  totalUnit?: string,

  /**
   * Will omit total key and total unit
   */
  totalText?: string,
  filter?: Filter,
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title = "My Awesome Chart",
  data,
  totalKey,
  totalUnit,
  filter,
  totalText,
  keys=[],
  indexBy="id",
}) => {

  const [showTotal, setShowTotal] = useState(false);

  let total = 0;
  if (data && totalKey) {
    data.forEach((d) => {
      console.log(d[totalKey]);
      total += d[totalKey];
    })
  }

  return (
    <Box className="chart-card"  >
      <Flex justify="space-between" align="center" className="chart-card__heading">
        <Heading fontWeight="normal" size="md" >
          {title}
        </Heading>

        {totalKey ? (
          <Flex justify="flex-end" align="center">
            <FormLabel htmlFor="switchable-">Compare Total</FormLabel>
            <Switch id="switchable-" onChange={() => setShowTotal(!showTotal)} value={showTotal}/>
          </Flex>
        ) : ''}
      </Flex>

      <div className="chart-card__body">
        {!data || data.length === 0 ? (
          <Heading className="chart-card__no-data" size="md">
            No data available
          </Heading>
        ) : (
          <ResponsiveBar
            data={data}
            keys={keys}
            enableLabel={false}
            indexBy={indexBy}
            layout={data && data.length <= 10 ? "horizontal" : "vertical"}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Distance',
              legendOffset: 32,
              legendPosition: 'middle',
            }}
            theme={visualizerLegends}
            colors={{ scheme: 'nivo' }}
            animate={true}
            groupMode="stacked"
            margin={{
              top: 40,
              left: 100,
              right: 50,
              bottom: 100
            }}
            innerPadding={2}
            legends={[
              {
                dataFrom: 'indexes',
                anchor: 'top',
                direction: 'row',
                justify: false,
                itemHeight: 100,
                itemWidth: 20,
                symbolSize: 20,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 100,
                itemDirection: 'left-to-right',
              }
            ]}
          />
        )}
      </div>

      <Flex align="center" justify="space-between" className="chart-card__footer">
          {filter && (
            <div className="chart-card__footer__filter">
              <List spacing={3}>
                {Object.keys(filter).map((key) => {
                  if (!filter[key]) {
                    return '';
                  }
                  let filterText = filter[key];

                  if (filter.timeStart === filter[key]) {
                    filterText = "from " + filterText;
                  } else if(filter.timeEnd === filter[key]) {
                    filterText = "to " + filterText;
                  } else if (key === 'limit') {
                    if (filter.isUnlimited) {
                      return '';
                    }

                    filterText = "Limit to " + filter[key] + " data";
                  }

                  return (
                    <ListItem key={key}>
                      <ListIcon icon="circle" />
                      {filterText}
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

          {totalKey && totalKey.length > 0 && (
            <div className="chart-card__footer__total">
              total <span>{totalText ? totalText : total.toFixed(2) + " " + totalUnit}</span>
            </div>
          )}
      </Flex>
    </Box>
  );
}