// src/data/formulas.js

export const formulas = [
  // --- 1. Break-Even Point ---
 {
    id: "break-even",
    title: "Break-Even Point",
    description: "Calculate the sales volume needed to cover costs.",
    inputs: [
      { name: "fixedCosts", label: "Fixed Costs (EGP)", placeholder: "50000", type: "number" },
      { name: "sellingPrice", label: "Selling Price per Unit (EGP)", placeholder: "100", type: "number" },
      { name: "variableCost", label: "Variable Cost per Unit (EGP)", placeholder: "60", type: "number" },
    ],
    calculate: (values) => {
      const fc = parseFloat(values.fixedCosts);
      const sp = parseFloat(values.sellingPrice);
      const vc = parseFloat(values.variableCost);

      if (sp - vc <= 0) return { error: "Selling price must be higher than variable cost." };

      const breakEvenUnits = fc / (sp - vc);
      const breakEvenRevenue = breakEvenUnits * sp;
      const totalVariableCost = breakEvenUnits * vc;

      return {
        mainValue: Math.ceil(breakEvenUnits),
        unit: "Units",
        details: `Revenue needed: ${breakEvenRevenue.toLocaleString()} EGP`,
        // Bar Chart Data (Comparison)
        chartData: [
          { name: "Total Cost", value: fc + totalVariableCost },
          { name: "Revenue", value: breakEvenRevenue },
        ],
        // Pie Chart Data (Cost Breakdown) -> NEW
        pieData: [
          { name: "Fixed Costs", value: fc },
          { name: "Variable Costs", value: totalVariableCost },
        ]
      };
    }
  },

  // --- 2. Return on Investment (ROI) ---
 {
    id: "roi",
    title: "Return on Investment (ROI)",
    description: "Measure the profitability of an investment.",
    inputs: [
      { name: "netProfit", label: "Net Profit (EGP)", placeholder: "20000", type: "number" },
      { name: "totalInvestment", label: "Total Investment (EGP)", placeholder: "100000", type: "number" },
    ],
    calculate: (values) => {
      const profit = parseFloat(values.netProfit);
      const investment = parseFloat(values.totalInvestment);

      if (investment === 0) return { error: "Investment cannot be zero." };
      const roi = (profit / investment) * 100;

      return {
        mainValue: roi.toFixed(2),
        unit: "%",
        details: roi > 0 ? "Positive Return" : "Negative Return",
        chartData: [
          { name: "Invested", value: investment },
          { name: "Return (Profit)", value: profit },
        ],
        // Pie Chart Data (Composition) -> NEW
        pieData: [
          { name: "Investment Base", value: investment },
          { name: "Net Profit", value: Math.abs(profit) },
        ]
      };
    }
  },

  // --- 3. Net Present Value (NPV) ---
 {
      id: "npv",
      title: "Net Present Value (NPV)",
      description: "Calculate the current value of future cash flows.",
      inputs: [
        { name: "initialInvestment", label: "Initial Investment", placeholder: "e.g., 100000", type: "number" },
        { name: "discountRate", label: "Discount Rate (%)", placeholder: "e.g., 10", type: "number" },
        { name: "cashFlows", label: "Future Cash Flows (separated by comma)", placeholder: "e.g., 20000, 30000", type: "text" }, 
      ],
      calculate: (values) => {
        // ... نفس كود الحساب القديم ...
        const initial = parseFloat(values.initialInvestment);
        const rate = parseFloat(values.discountRate) / 100;
        const flows = values.cashFlows.split(',').map(num => parseFloat(num.trim()));
        let presentValueSum = 0;
        flows.forEach((flow, index) => { presentValueSum += flow / Math.pow((1 + rate), index + 1); });
        const npv = presentValueSum - initial;

        return {
          mainValue: npv.toFixed(2),
          unit: "EGP",
          details: npv > 0 ? "Feasible" : "Not Feasible",
          chartData: [
            { name: "Initial Cost", value: initial },
            { name: "PV Returns", value: presentValueSum },
          ],
          // NPV doesn't necessarily need a pie chart, so we can leave pieData undefined
        };
      },
  },

  // --- 4. Internal Rate of Return (IRR) ---
  {
    id: "irr",
    title: "Internal Rate of Return (IRR)",
    description: "The discount rate that makes NPV zero.",
    inputs: [
      { name: "initialInvestment", label: "Initial Investment (EGP)", placeholder: "e.g., 100000", type: "number" },
      { name: "cashFlows", label: "Future Cash Flows (Yearly, separated by comma)", placeholder: "e.g., 20000, 30000, 40000", type: "text" }, 
    ],
    calculate: (values) => {
      const initial = parseFloat(values.initialInvestment); // This is effectively negative logic
      const flows = values.cashFlows.split(',').map(num => parseFloat(num.trim()));

      if (isNaN(initial) || flows.some(isNaN)) return { error: "Please check your inputs." };

      // Simplified IRR Estimation Algorithm
      // We try rates from -50% to 100% to find where NPV is closest to 0
      let minRate = -0.5;
      let maxRate = 1.0;
      let guess = 0.1; // 10% start
      let accuracy = 0.001; // precision
      
      const calculateNPV = (r) => {
        let npv = -initial;
        flows.forEach((flow, i) => {
          npv += flow / Math.pow((1 + r), i + 1);
        });
        return npv;
      };

      // Simple Iteration (Newton approximation simplified)
      for (let i = 0; i < 1000; i++) {
        let npv = calculateNPV(guess);
        if (Math.abs(npv) < accuracy) break;
        if (npv > 0) {
           guess += 0.0001; // Increase rate to lower NPV
        } else {
           guess -= 0.0001; // Decrease rate to raise NPV
        }
      }

      const irrPercentage = guess * 100;

      return {
        mainValue: irrPercentage.toFixed(2),
        unit: "%",
        details: `This is the expected annual growth rate.`,
        // For IRR, a bar chart of Cash Flows over time is best
        chartData: [
            { name: "Start", value: -initial },
            ...flows.map((f, i) => ({ name: `Year ${i+1}`, value: f }))
        ]
      };
    }
  },

  // --- 5. Payback Period ---

  {
    id: "payback-period",
    title: "Payback Period",
    description: "Time required to recover the initial cost of an investment.",
    inputs: [
      { name: "initialInvestment", label: "Initial Investment (EGP)", placeholder: "e.g., 50000", type: "number" },
      { name: "annualCashFlow", label: "Estimated Annual Cash Flow (EGP)", placeholder: "e.g., 12000", type: "number" },
    ],
    calculate: (values) => {
      const investment = parseFloat(values.initialInvestment);
      const cashFlow = parseFloat(values.annualCashFlow);

      if (cashFlow <= 0) return { error: "Cash flow must be greater than zero." };

      const years = investment / cashFlow;

      return {
        mainValue: years.toFixed(1),
        unit: "Years",
        details: `You will recover your money in roughly ${years.toFixed(1)} years.`,
        chartData: [
          { name: "Investment", value: investment },
          { name: "1st Year Flow", value: cashFlow },
          { name: "Cumulative 2y", value: cashFlow * 2 },
          { name: "Cumulative 3y", value: cashFlow * 3 },
        ]
      };
    }
  },

  // --- 6. Gross Profit Margin ---
 {
    id: "profit-margin",
    title: "Gross Profit Margin",
    description: "The percentage of revenue that exceeds the cost of goods sold.",
    inputs: [
      { name: "revenue", label: "Total Revenue", placeholder: "100000", type: "number" },
      { name: "cogs", label: "Cost of Goods Sold (COGS)", placeholder: "60000", type: "number" },
    ],
    calculate: (values) => {
      const rev = parseFloat(values.revenue);
      const cost = parseFloat(values.cogs);
      if (rev === 0) return { error: "Revenue cannot be zero." };
      const grossProfit = rev - cost;
      const margin = (grossProfit / rev) * 100;

      return {
        mainValue: margin.toFixed(2),
        unit: "%",
        details: "Margin Efficiency",
        chartData: [
          { name: "Revenue", value: rev },
          { name: "COGS", value: cost },
        ],
        // Pie Chart showing where the money goes
        pieData: [
          { name: "Costs (COGS)", value: cost },
          { name: "Gross Profit", value: grossProfit },
        ]
      };
    }
  },

  // --- 7. Startup Runway ---
  {
    id: "runway",
    title: "Startup Runway",
    description: "How many months the business can survive with current cash.",
    inputs: [
      { name: "currentCash", label: "Current Cash on Hand (EGP)", placeholder: "e.g., 200000", type: "number" },
      { name: "monthlyBurn", label: "Monthly Burn Rate (Expenses) (EGP)", placeholder: "e.g., 15000", type: "number" },
    ],
    calculate: (values) => {
      const cash = parseFloat(values.currentCash);
      const burn = parseFloat(values.monthlyBurn);

      if (burn <= 0) return { error: "Monthly expenses must be greater than zero." };

      const months = cash / burn;

      return {
        mainValue: Math.floor(months),
        unit: "Months",
        details: months < 6 ? "Warning: Less than 6 months of runway left!" : "Safe zone: Sufficient runway.",
        chartData: [
          { name: "Total Cash", value: cash },
          { name: "Monthly Burn", value: burn },
          { name: "6-Month Cost", value: burn * 6 },
        ]
      };
    }
  }
];