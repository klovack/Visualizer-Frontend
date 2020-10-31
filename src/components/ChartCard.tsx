import { Box, Flex, FormLabel, Heading, Switch } from '@chakra-ui/core';
import { ResponsiveBar, } from '@nivo/bar';
import React, { useState } from 'react'

import { visualizerLegends } from '../shared/nivo-bar-themes';

interface ChartCardProps {
  title?: string,
  data?: any[],
}

const mock = [{ "id": 36, "vendorId": 2, "passengerCount": 2, "distance": 3.663, "pickupLocation": { "lat": 40.7296524047852, "lng": -73.984619140625 }, "dropoffLocation": { "lat": 40.7626686096191, "lng": -73.9868850708008 }, "pickupTime": "2015-01-01T04:29:47.000Z", "dropoffTime": "2015-01-01T04:42:08.000Z", "fare_amount": 13.8 }, { "id": 37, "vendorId": 2, "passengerCount": 1, "distance": 8.315, "pickupLocation": { "lat": 40.7013168334961, "lng": -73.9187088012695 }, "dropoffLocation": { "lat": 40.7682151794434, "lng": -73.8615493774414 }, "pickupTime": "2015-01-01T04:29:47.000Z", "dropoffTime": "2015-01-01T04:49:54.000Z", "fare_amount": 34.55 }, { "id": 38, "vendorId": 2, "passengerCount": 1, "distance": 0.669, "pickupLocation": { "lat": 40.7292022705078, "lng": -73.9571304321289 }, "dropoffLocation": { "lat": 40.7287483215332, "lng": -73.9513397216797 }, "pickupTime": "2015-01-01T04:29:48.000Z", "dropoffTime": "2015-01-01T04:31:12.000Z", "fare_amount": 5.8 }, { "id": 39, "vendorId": 2, "passengerCount": 2, "distance": 1.29, "pickupLocation": { "lat": 40.6962699890137, "lng": -73.9337921142578 }, "dropoffLocation": { "lat": 40.7070503234863, "lng": -73.9537124633789 }, "pickupTime": "2015-01-01T04:29:48.000Z", "dropoffTime": "2015-01-01T04:34:47.000Z", "fare_amount": 9.2 }, { "id": 40, "vendorId": 1, "passengerCount": 1, "distance": 3.205, "pickupLocation": { "lat": 40.7318992614746, "lng": -74.0065765380859 }, "dropoffLocation": { "lat": 40.7585716247559, "lng": -73.9801406860352 }, "pickupTime": "2015-01-01T04:29:48.000Z", "dropoffTime": "2015-01-01T04:37:10.000Z", "fare_amount": 12.95 }, { "id": 41, "vendorId": 2, "passengerCount": 2, "distance": 6.545, "pickupLocation": { "lat": 40.7633514404297, "lng": -73.9902725219727 }, "dropoffLocation": { "lat": 40.8307151794434, "lng": -73.9475021362305 }, "pickupTime": "2015-01-01T04:29:48.000Z", "dropoffTime": "2015-01-01T04:43:17.000Z", "fare_amount": 21.8 }, { "id": 42, "vendorId": 2, "passengerCount": 1, "distance": 1.729, "pickupLocation": { "lat": 40.7311553955078, "lng": -74.0067367553711 }, "dropoffLocation": { "lat": 40.7176780700684, "lng": -73.9902496337891 }, "pickupTime": "2015-01-01T04:29:48.000Z", "dropoffTime": "2015-01-01T04:46:49.000Z", "fare_amount": 13.3 }, { "id": 43, "vendorId": 1, "passengerCount": 2, "distance": 0.627, "pickupLocation": { "lat": 40.7293395996094, "lng": -73.9781036376953 }, "dropoffLocation": { "lat": 40.7231712341309, "lng": -73.9763870239258 }, "pickupTime": "2015-01-01T04:29:49.000Z", "dropoffTime": "2015-01-01T04:31:50.000Z", "fare_amount": 5.3 }, { "id": 44, "vendorId": 2, "passengerCount": 2, "distance": 1.023, "pickupLocation": { "lat": 40.8379364013672, "lng": -73.9418563842773 }, "dropoffLocation": { "lat": 40.8498725891113, "lng": -73.9378967285156 }, "pickupTime": "2015-01-01T04:29:49.000Z", "dropoffTime": "2015-01-01T04:36:47.000Z", "fare_amount": 7.8 }, { "id": 45, "vendorId": 2, "passengerCount": 1, "distance": 1.54, "pickupLocation": { "lat": 40.7638282775879, "lng": -73.9151229858398 }, "dropoffLocation": { "lat": 40.7454986572266, "lng": -73.9231719970703 }, "pickupTime": "2015-01-01T04:29:49.000Z", "dropoffTime": "2015-01-01T04:38:09.000Z", "fare_amount": 9.3 }, { "id": 46, "vendorId": 1, "passengerCount": 1, "distance": 4.551, "pickupLocation": { "lat": 40.7382392883301, "lng": -73.9879531860352 }, "dropoffLocation": { "lat": 40.7105674743652, "lng": -73.948127746582 }, "pickupTime": "2015-01-01T04:29:49.000Z", "dropoffTime": "2015-01-01T04:46:29.000Z", "fare_amount": 20.75 }, { "id": 47, "vendorId": 2, "passengerCount": 1, "distance": 0.466, "pickupLocation": { "lat": 40.7231597900391, "lng": -73.9857177734375 }, "dropoffLocation": { "lat": 40.7274971008301, "lng": -73.987174987793 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:31:15.000Z", "fare_amount": 4.8 }, { "id": 48, "vendorId": 2, "passengerCount": 1, "distance": 1.587, "pickupLocation": { "lat": 40.7619094848633, "lng": -73.9838180541992 }, "dropoffLocation": { "lat": 40.7479286193848, "lng": -74.0005035400391 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:35:46.000Z", "fare_amount": 8.3 }, { "id": 49, "vendorId": 2, "passengerCount": 1, "distance": 2.541, "pickupLocation": { "lat": 40.7118377685547, "lng": -73.9629592895508 }, "dropoffLocation": { "lat": 40.6956672668457, "lng": -73.9265670776367 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:44:28.000Z", "fare_amount": 14.3 }, { "id": 50, "vendorId": 1, "passengerCount": 1, "distance": 3.61, "pickupLocation": { "lat": 40.8168449401855, "lng": -73.9427032470703 }, "dropoffLocation": { "lat": 40.8578987121582, "lng": -73.9319000244141 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:48:55.000Z", "fare_amount": 16.8 }, { "id": 51, "vendorId": 2, "passengerCount": 3, "distance": 7.409, "pickupLocation": { "lat": 40.7354507446289, "lng": -73.9981689453125 }, "dropoffLocation": { "lat": 40.8108329772949, "lng": -73.9526748657227 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:50:45.000Z", "fare_amount": 25.3 }, { "id": 52, "vendorId": 2, "passengerCount": 1, "distance": 17.902, "pickupLocation": { "lat": 40.7574157714844, "lng": -73.9829635620117 }, "dropoffLocation": { "lat": 40.6950569152832, "lng": -74.1771926879883 }, "pickupTime": "2015-01-01T04:29:50.000Z", "dropoffTime": "2015-01-01T04:54:13.000Z", "fare_amount": 81.8 }, { "id": 53, "vendorId": 2, "passengerCount": 1, "distance": 0.453, "pickupLocation": { "lat": 40.7975959777832, "lng": -73.9520111083984 }, "dropoffLocation": { "lat": 40.7998809814453, "lng": -73.9579772949219 }, "pickupTime": "2015-01-01T04:29:51.000Z", "dropoffTime": "2015-01-01T04:35:03.000Z", "fare_amount": 6.8 }, { "id": 54, "vendorId": 2, "passengerCount": 5, "distance": 6.994, "pickupLocation": { "lat": 40.7140998840332, "lng": -74.0064086914062 }, "dropoffLocation": { "lat": 40.775390625, "lng": -73.9502716064453 }, "pickupTime": "2015-01-01T04:29:51.000Z", "dropoffTime": "2015-01-01T04:43:35.000Z", "fare_amount": 26.6 }, { "id": 55, "vendorId": 1, "passengerCount": 5, "distance": 1.062, "pickupLocation": { "lat": 40.7456817626953, "lng": -73.9802322387695 }, "dropoffLocation": { "lat": 40.7503128051758, "lng": -73.9910125732422 }, "pickupTime": "2015-01-01T04:29:52.000Z", "dropoffTime": "2015-01-01T04:34:16.000Z", "fare_amount": 6.8 }]

export const ChartCard: React.FC<ChartCardProps> = ({
  title = "My Awesome Chart",
}) => {

  const [showTotal, setShowTotal] = useState(false);

  let vendorId1Total = {
    distance: 0,
    fare: 0,
  };
  let vendorId2Total = {
    distance: 0,
    fare: 0,
  };

  let data = [];
  if (showTotal) {
    mock.forEach((m, i) => {
      if (m.vendorId === 1) {
        vendorId1Total.distance += m.distance;
        vendorId1Total.fare += m.fare_amount;
      } else if (m.vendorId === 2) {
        vendorId2Total.distance += m.distance;
        vendorId2Total.fare += m.fare_amount;
      }
    });
    data = [{
      id: 'total vendor 1',
      vendorId: 1,
      distance: vendorId1Total.distance.toFixed(2),
      fare_amount: vendorId1Total.fare.toFixed(2)
    }, {
      id: 'total vendor 2',
      vendorId: 2,
      distance: vendorId2Total.distance.toFixed(2),
      fare_amount: vendorId2Total.fare.toFixed(2),
    }];
  } else {
    data = mock;
  }

  return (
    <Box className="chart-card"  >
      <Flex justify="space-between" align="center" className="chart-card__heading">
        <Heading fontWeight="normal" size="md" >
          {title}
        </Heading>

        <Flex justify="flex-end" align="center">
          <FormLabel htmlFor="switchable-">Has Switch</FormLabel>
          <Switch id="switchable-" onChange={() => setShowTotal(!showTotal)} value={showTotal}/>
        </Flex>
      </Flex>

      <div className="chart-card__body">
        <ResponsiveBar
          data={data}
          enableLabel={data.length <= 10}
          keys={['distance', 'fare_amount']}
          indexBy="id"
          layout="horizontal"
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
        />
      </div>

      <Flex align="center" justify="space-between" className="chart-card__footer">
          <div className="chart-card__footer__filter">
            01.01.2015, 05:00 am - 01.01.2015, 11:59
          </div>

          <div className="chart-card__footer__total">
            total <span>38km</span>
          </div>
      </Flex>
    </Box>
  );
}