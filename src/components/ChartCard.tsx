import { Box, Flex, FormLabel, Heading, List, ListIcon, ListItem, Switch } from '@chakra-ui/core';
import { ResponsiveBarCanvas } from '@nivo/bar';
import { getOrdinalColorScale } from '@nivo/colors';
import { AxisProps } from '@nivo/axes';
import React, { useEffect, useState } from 'react'
import { Filter } from '../models/filter';
import date from 'date-and-time';

import { barColors, visualizerLegends } from '../shared/nivo-bar-themes';

interface ChartCardProps {
  title?: string,
  data: object[],
  keys?: string[],
  keysUnit?: string,
  indexBy?: string,
  /**
   * in case you want to specify different text for index.
   * This is useful for legend
   */
  indexByText?: string,
  totalKey?: string,
  totalUnit?: string,
  /**
   * Which property should the total grouped by
   */
  groupTotalBy?: string,
  groupTotalByText?: string,
  
  /**
   * Will omit total key and total unit
   */
  totalText?: string,
  filter?: Filter,
  defaultTotal?: boolean,
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title = "My Awesome Chart",
  data,
  totalKey,
  totalUnit,
  filter,
  totalText,
  keys=[],
  keysUnit,
  indexBy="id",
  indexByText,
  groupTotalBy,
  groupTotalByText,
  defaultTotal = true,
}) => {

  const [showTotal, setShowTotal] = useState(defaultTotal);

  let total = 0;
  let actualData = []
  let totalData = []
  if (data && totalKey) {
    data.forEach((d) => {
      let hasTotal = false;
      
      totalData.forEach((td) => {
        if (td[groupTotalBy] === d[groupTotalBy]) {
          td[totalKey] = td[totalKey] + d[totalKey];
          hasTotal = true;
          return;
        }
      });
      if (!hasTotal) {
        const newTotalData = {
          ...d
        }

        newTotalData[indexBy] = groupTotalByText + " " + d[groupTotalBy]
        totalData.push(newTotalData);
      }
      total += d[totalKey];
    });
  }

  if (showTotal) {
    actualData = totalData
  } else {
    actualData = data
  }

  const hasSmallData = actualData && actualData.length <= 10;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  });
  const isScreenSmall = windowWidth <= 700 ? true : false;

  const leftAxis: AxisProps = {
    tickSize: 5,
    tickPadding: 30,
    tickRotation: isScreenSmall ? -60 : 0,
    legend: indexByText ? indexByText : indexBy ,
    legendPosition: "middle",
    legendOffset: -20,
  };
  leftAxis.legend = hasSmallData ? leftAxis.legend : keysUnit;

  const bottomAxis: AxisProps = {
    tickSize: 5,
    tickPadding: 30,
    tickRotation: actualData && actualData.length <= 10 ? 0 : 60,
    legend: indexByText ? indexByText : indexBy,
    legendPosition: "middle",
    legendOffset: 20,
  }
  bottomAxis.legend = hasSmallData ? keysUnit : bottomAxis.legend;

  return (
    <Box className="chart-card"  >
      <Flex justify="space-between" align="center" flexWrap="wrap" className="chart-card__heading">
        <Heading fontWeight="normal" size="md" >
          {title}
        </Heading>

        {totalKey ? (
          <Flex justify="flex-end" align="center">
            <FormLabel htmlFor="switchable-">Compare Total</FormLabel>
            <Switch id="switchable-" onChange={() => setShowTotal(!showTotal)} isChecked={showTotal}/>
          </Flex>
        ) : ''}
      </Flex>

      <div className="chart-card__body">
        {!actualData || actualData.length === 0 ? (
          <Heading className="chart-card__no-data" size="md">
            No data available
          </Heading>
        ) : (
          <ResponsiveBarCanvas
            data={actualData}
            keys={keys}
            enableLabel={false}
            indexBy={indexBy}
            layout={hasSmallData ? "horizontal" : "vertical"}
            axisBottom={bottomAxis}
            axisLeft={leftAxis}
            enableGridX={hasSmallData ? true : false}
            enableGridY={hasSmallData ? false : true}
            theme={visualizerLegends}
            colors={getOrdinalColorScale(barColors, 'index')}
            groupMode="grouped"
            margin={{
              top: 40,
              left: isScreenSmall ? 30 : 50,
              right: isScreenSmall ? 30 : 150,
              bottom: actualData[0][indexBy].toString().length  * 7.5,
            }}
            innerPadding={2}
            legends={isScreenSmall && !hasSmallData ? [] : [
              {
                dataFrom: 'indexes',
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                itemHeight: 10,
                itemWidth: 100,
                symbolSize: 15,
                translateX: isScreenSmall ? 0 : 120,
                translateY: -20,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
              }
            ]}
            tooltip={(p) => {
              return (
              <div style={{textTransform: 'capitalize'}}>
                <p>
                  <strong>{p.id}</strong>: {p.value.toFixed(2)}
                </p>
                <p>
                  <strong>{groupTotalBy}</strong>: {p.data[groupTotalBy]}
                </p>
              </div>
            )}}
          />
        )}
      </div>

      <Flex align="center" justify="space-between" alignItems="center" flexWrap="wrap" className="chart-card__footer">
          {filter && (
            <div className="chart-card__footer__filter">
              <List spacing={3}>
                {Object.keys(filter).map((key) => {
                  if (!filter[key]) {
                    return '';
                  }
                  let filterText = filter[key];

                  if (filter.timeStart === filter[key]) {
                    filterText = "from " + date.format(new Date(filter[key]), 'YYYY-MM-DD HH:mm');
                  } else if(filter.timeEnd === filter[key]) {
                    filterText = "to " + date.format(new Date(filter[key]), 'YYYY-MM-DD HH:mm');
                  } else if (key === 'limit') {
                    if (filter.isUnlimited) {
                      return '';
                    }

                    filterText = "Limit to " + filter[key] + " data";
                  }

                  return (
                    <ListItem key={key}>
                      <ListIcon icon="check-circle" />
                      {filterText}
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

          {totalKey && totalKey.length > 0 && (
            <div className="chart-card__footer__total">
              total <span className="chart-card__footer__total__unit">{totalText ? totalText : total.toFixed(2) + " " + totalUnit}</span>
            </div>
          )}
      </Flex>
    </Box>
  );
}