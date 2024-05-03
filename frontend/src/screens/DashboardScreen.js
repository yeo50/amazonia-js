/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */

import { LineChart } from 'chartist';
import { PieChart } from 'chartist';
import { getSummary } from '../api';
import DashboardMenu from '../components/DashboardMenu';

let summary = {};
const DashboardScreen = {
    after_render: () => {
        new LineChart(
            '#chart',
            {
                labels: summary.dailyOrders.map((x) => x._id),
                series: [summary.dailyOrders.map((x) => x.sales)],
            },
            {
                low: 0,
                showArea: true,
            }
        );

        const data = {
            labels: summary.productCategories.map((x) => x._id),
            series: summary.productCategories.map((x) => x.count),
        };

        new PieChart(
            '#chart-pie',
            data,

            {
                chartPadding: 10,
                labelOffset: 60,
                labelDirection: 'explode',

                // labelInterpolationFnc: (value) => String(value)[0],
            }
        );
    },
    render: async () => {
        summary = await getSummary();
        return `
        <div class="dashboard">
          ${DashboardMenu.render({ selected: 'dashboard' })}
            <div class ="dashboard-content">
               <h1> Dashboard</h1>
         <ul class="summary-items">
            <li>
              <div class="summary-title color1">
              <span><i class="fa fa-users"></i> Users</span>
              </div>
              <div class="summary-body">${summary.users[0].numUsers}</div>
            </li>
            <li>
              <div class="summary-title color2">
               <span><i class="fa fa-users"></i> Orders</span>
               </div>
               <div class="summary-body">${summary.orders[0].numOrders}</div>
             </li>
             <li>
               <div class="summary-title color3">
               <span><i class="fa fa-users"></i> Sales</span>
                </div>
               <div class="summary-body">$${summary.orders[0].totalSales}</div>
            </li>
         </ul>
        <div class="charts">
          <div>
            <h2>Sales</h2>
            <div id="chart">
          </div>
          </div>
          <div class="pie-chart">
             <h2> Categories</h2>
                <div id="chart-pie">
          </div>
          </div>
        
        </div> 
       
        </div>
       </div>
        
        </div>`;
    },
};
export default DashboardScreen;
