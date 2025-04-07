---

## Overview
You’re building a set of dashboardsto help various teams (e.g., Operations, Quality Control, Finance, CEO, Client Operations) monitor and improve their supply chain. Each dashboard is tailored to its beneficiary, displaying KPIs to provide actionable insights into efficiency, quality, compliance, and profitability. The dashboards will initially use **sample data**.

---

## General Requirements for All Dashboards
Before diving into specific dashboards, here are the universal requirements you’ll need to implement across all of them:



## Dashboard-Specific Requirements
Here’s a detailed breakdown of each dashboard, including its purpose, KPIs, data sources (nodes), display requirements, and functionality. Follow these specifications to build dashboards that meet Trident’s needs.

### 1. Agency Operations Dashboard (Operations)
- **Purpose:** Monitor transportation efficiency and produce condition during transit.
- **KPIs:**
  - Transit time
  - Quantity loaded vs. received
  - Condition upon arrival
  - Temperature (during transport)
- **Data Sources:** Transportation nodes (Farm to Packhouse, Packhouse to Cold Storage, Cold Storage to Port)
- **Display Requirements:**
  - Real-time tracking of transit time (e.g., line chart or table showing duration per shipment).
  - Bar chart comparing quantity loaded vs. received to highlight losses.
  - Temperature gauge or line chart with alerts if outside 13-14°C (e.g., for bananas).
  - Optional: Map view showing shipment routes and statuses.
- **Functionality:**
  - Filters: Transportation phase (e.g., Farm to Packhouse) or shipment ID.
  - Drill-down: Click a shipment to see detailed condition reports (e.g., damage notes).

### 2. Governance Dashboard (Internal Audit)
- **Purpose:** Ensure adherence to quality and regulatory standards.
- **KPIs:**
  - Compliance documentation completion
  - Rejection rate
  - Quality test pass/fail rates
  - Physical quality metrics
- **Data Sources:** Packhouse Processing, Port Processing
- **Display Requirements:**
  - Line chart showing rejection rate trends over time.
  - Pie chart for quality test pass/fail rates (e.g., pesticide residue tests).
  - Progress bar or checklist for compliance documentation status (e.g., 80% complete).
- **Functionality:**
  - Filters: Audit period (e.g., monthly) or shipment ID.
  - Export: Generate audit reports with compliance and quality metrics.

### 3. Compliance Dashboard (Quality Control)
- **Purpose:** Track quality and compliance across production and storage.
- **KPIs:**
  - Soil quality (pH, nutrients)
  - Fertilizer usage
  - Pest management effectiveness
  - Irrigation efficiency
  - Maturity stage
  - Visual inspection results
  - Cleanliness
  - Size, shape, color, defects
  - Grade distribution
  - Storage temperature and humidity
  - Periodic quality checks
- **Data Sources:** Farm Production, Harvesting, Packhouse Processing, Cold Storage
- **Display Requirements:**
  - Heatmap for soil quality across farms (e.g., pH levels by location).
  - Bar chart for defect rates and grade distribution (e.g., Extra class, Class I).
  - Gauges for real-time temperature and humidity in cold storage, with alerts for deviations.
- **Functionality:**
  - Filters: Farm, harvest batch, or storage facility.
  - Trend analysis: Show quality metric trends over time (e.g., defect rates).

### 4. Payments Dashboard (Finance and Accounts)
- **Purpose:** Manage financial transactions based on produce volume.
- **KPIs:**
  - Quantity harvested
  - Quantity received
  - Weight per box
  - Quantity loaded at port
- **Data Sources:** Harvesting, Packhouse Processing, Port Processing
- **Display Requirements:**
  - Bar chart comparing quantity harvested vs. received to track losses.
  - Line chart or table for weight per box consistency.
  - Total export quantity tracker (e.g., KPI card showing tons loaded at port).
- **Functionality:**
  - Payment calculation: Logic to compute payments based on quantity and predefined rates.
  - Export: Data for accounting system reconciliation.

### 5. Samples CRM Dashboard (Sales)
- **Purpose:** Support sales by tracking produce quality for customer satisfaction.
- **KPIs:**
  - Initial quality assessment
  - Grade distribution
  - Labeling accuracy
  - Size, shape, color, defects
- **Data Sources:** Farm Production, Packhouse Processing
- **Display Requirements:**
  - Scorecard for quality assessment per batch (e.g., 8/10).
  - Pie chart for grade distribution (e.g., Extra class, Class I).
  - Bar chart or table for labeling accuracy metrics.
- **Functionality:**
  - Filters: Customer or market segment (e.g., EU, US).
  - Link to feedback: Placeholder for future customer feedback integration.

### 6. Financing Dashboard (CEO)
- **Purpose:** Provide a high-level view of operational efficiency and financial performance.
- **KPIs:**
  - Yield per acre
  - Rejection rate
  - Storage duration
  - Transit time
- **Data Sources:** Farm Production, Packhouse Processing, Cold Storage, Transportation
- **Display Requirements:**
  - KPI cards for yield, rejection rate, average transit time, and storage duration.
  - Line chart comparing storage duration vs. optimal freshness (e.g., 30-day threshold).
  - Financial impact analysis (e.g., cost of rejections in dollars).
- **Functionality:**
  - Drill-down: Click KPIs to view specific farms or shipments.
  - Scenario analysis: Placeholder for resource allocation simulations (e.g., “what if” storage increases).

### 7. RM and Product Performance Dashboard (CEO)
- **Purpose:** Monitor product quality and raw material performance.
- **KPIs:**
  - Soil quality
  - Fertilizer usage
  - Pest management
  - Irrigation
  - Maturity stage
  - Handling practices
  - Cleanliness
  - Size, shape, color, defects
  - Grade
  - Storage temperature and humidity
- **Data Sources:** Farm Production, Harvesting, Packhouse Processing, Cold Storage
- **Display Requirements:**
  - Trend lines for soil quality and pest management effectiveness over time.
  - Bar chart for defect rates and grade consistency.
  - Line chart showing storage condition impacts (e.g., temperature vs. defect rate).
- **Functionality:**
  - Filters: Compare farms or batches.
  - Correlation analysis: Placeholder for linking inputs (e.g., fertilizer) to quality outcomes.

### 8. Supplier KYC Dashboard (Compliance)
- **Purpose:** Ensure suppliers meet regulatory and company standards.
- **KPIs:**
  - Compliance documentation completion
  - Quality test results
  - Pre-loading inspection pass rates
- **Data Sources:** Port Processing
- **Display Requirements:**
  - Scorecard for supplier compliance (e.g., 90% compliant).
  - Bar chart for quality test results (e.g., residue levels).
  - Pie chart for pre-loading inspection pass/fail rates.
- **Functionality:**
  - Alerts: Flag non-compliant suppliers (e.g., <80% compliance).
  - Trend tracking: Show supplier performance over time.



---

---

## Summary
- **Current Task:** Build dashboards using sample data to visualize KPIs for each beneficiary (Operations, Finance, CEO, etc.).
- **Key Focus:** Make dashboards intuitive, actionable, and aligned with each team’s needs.

By following these requirements, you’ll deliver dashboards that work with sample data now and 