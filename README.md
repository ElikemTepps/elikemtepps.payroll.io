# Ghana Payroll System (HTML Version)

A pure HTML/CSS/JavaScript implementation of the Ghana Payroll System that can be used as a standalone prototype. This version doesn't require a server or database and can run entirely in the browser.

## Features

- **Employee Management:** Add, view and manage employee records
- **Payroll Processing:** Generate and manage monthly payrolls
- **Payslip Generation:** Create and download PDF payslips
- **Tax Calculations:** Accurate Ghanaian income tax, SSNIT, and health insurance calculations
- **Reports and Analytics:** Visualize payroll data with charts and graphs
- **Responsive Design:** Works on mobile, tablet, and desktop devices

## Technical Details

This version uses:
- Pure HTML5, CSS3, and JavaScript (no frameworks)
- Chart.js for data visualization
- jsPDF and html2canvas for PDF generation
- Ghana-specific tax calculation logic based on current tax laws

## Pages

1. **Dashboard:** Overview of key payroll metrics and quick actions
2. **Employees:** Employee listing and management
3. **Payroll:** Monthly payroll processing and history
4. **Payslips:** Generate and download employee payslips
5. **Reports:** Financial reports and analytics
6. **Tax Calculator:** Standalone calculator for Ghanaian taxes
7. **Settings:** System configuration and preferences

## Ghana Tax Information

The system implements the following Ghanaian tax brackets (as of 2024):
- First GH₵ 4,380 - 0%
- Next GH₵ 1,320 - 5%
- Next GH₵ 1,560 - 10%
- Next GH₵ 36,000 - 17.5%
- Next GH₵ 196,740 - 25%
- Exceeding GH₵ 240,000 - 30%

SSNIT contribution: 5.5% (employee) and 13% (employer)
Health insurance: 2.5% of basic salary

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No installation or server setup required

## Notes

This is a prototype/demo version with sample data. For a production system with persistent data storage, consider using the full Node.js or PHP implementation of this project.

## Visual Design

The interface uses Ghana's national colors:
- Green (#006400) - Primary color
- Red (#CE1126) - Used for accent elements
- Yellow (#FCD116) - Used for highlighting and warnings

## Compatibility

Compatible with modern browsers including Chrome, Firefox, Safari, and Edge.
