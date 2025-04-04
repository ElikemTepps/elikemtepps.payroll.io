/**
 * Ghana Payroll System - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle functionality
    initSidebar();
    
    // Initialize sample data and populate dashboard stats
    initSampleData();
    
    // Initialize charts if we're on the dashboard
    if (document.getElementById('payrollChart') && document.getElementById('departmentChart')) {
        initCharts();
    }
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize search functionality for employees table
    initEmployeeSearch();
});

/**
 * Initialize sidebar toggle functionality
 */
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isSidebarClicked = sidebar.contains(event.target);
            const isToggleClicked = sidebarToggle.contains(event.target);
            
            if (!isSidebarClicked && !isToggleClicked && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
        
        // Handle responsive layout
        handleResponsiveLayout();
        window.addEventListener('resize', handleResponsiveLayout);
        
        function handleResponsiveLayout() {
            if (window.innerWidth > 992) {
                sidebar.classList.remove('show');
            }
        }
    }
}

/**
 * Initialize sample data and populate dashboard elements
 */
function initSampleData() {
    // Populate recent employees table
    const recentEmployeesTable = document.getElementById('recentEmployeesTable');
    
    if (recentEmployeesTable) {
        const tbody = recentEmployeesTable.querySelector('tbody');
        
        const recentEmployees = [
            { id: 'EMP001', name: 'Samuel Owusu', position: 'Software Developer', salary: 4500 },
            { id: 'EMP002', name: 'Akosua Mensah', position: 'HR Manager', salary: 5200 },
            { id: 'EMP003', name: 'Kwame Addo', position: 'Accountant', salary: 4100 },
            { id: 'EMP004', name: 'Abena Boateng', position: 'Marketing Specialist', salary: 3800 },
            { id: 'EMP005', name: 'Kofi Annan', position: 'Office Manager', salary: 4300 }
        ];
        
        let html = '';
        
        recentEmployees.forEach(employee => {
            html += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.position}</td>
                    <td>GH₵ ${formatMoney(employee.salary)}</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }
    
    // Populate recent activities
    const recentActivities = document.getElementById('recentActivities');
    
    if (recentActivities) {
        const activities = [
            { type: 'employee', action: 'Added a new employee', user: 'Admin', time: '2 hours ago' },
            { type: 'payroll', action: 'Processed June 2024 payroll', user: 'Admin', time: '1 day ago' },
            { type: 'settings', action: 'Updated tax rates', user: 'Admin', time: '3 days ago' },
            { type: 'payslip', action: 'Generated payslips for May 2024', user: 'Admin', time: '1 month ago' },
            { type: 'department', action: 'Added new department: Marketing', user: 'Admin', time: '2 months ago' }
        ];
        
        let html = '';
        
        activities.forEach(activity => {
            let iconClass = 'bi-info-circle';
            let bgClass = 'bg-info-light text-info';
            
            switch (activity.type) {
                case 'employee':
                    iconClass = 'bi-person-plus';
                    bgClass = 'bg-primary-light text-primary';
                    break;
                case 'payroll':
                    iconClass = 'bi-cash-stack';
                    bgClass = 'bg-success-light text-success';
                    break;
                case 'settings':
                    iconClass = 'bi-gear';
                    bgClass = 'bg-secondary-light text-secondary';
                    break;
                case 'payslip':
                    iconClass = 'bi-file-earmark-text';
                    bgClass = 'bg-warning-light text-warning';
                    break;
                case 'department':
                    iconClass = 'bi-diagram-3';
                    bgClass = 'bg-danger-light text-danger';
                    break;
            }
            
            html += `
                <div class="activity-item">
                    <div class="activity-icon ${bgClass}">
                        <i class="bi ${iconClass}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.action}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `;
        });
        
        recentActivities.innerHTML = html;
    }
    
    // Populate employees table
    const employeesFullTable = document.getElementById('employeesFullTable');
    
    if (employeesFullTable) {
        const tbody = employeesFullTable.querySelector('tbody');
        
        const employees = [
            { id: 'EMP001', name: 'Samuel Owusu', department: 'IT', position: 'Software Developer', salary: 4500, status: 'active' },
            { id: 'EMP002', name: 'Akosua Mensah', department: 'Human Resources', position: 'HR Manager', salary: 5200, status: 'active' },
            { id: 'EMP003', name: 'Kwame Addo', department: 'Finance', position: 'Accountant', salary: 4100, status: 'active' },
            { id: 'EMP004', name: 'Abena Boateng', department: 'Sales', position: 'Marketing Specialist', salary: 3800, status: 'active' },
            { id: 'EMP005', name: 'Kofi Annan', department: 'Administration', position: 'Office Manager', salary: 4300, status: 'active' },
            { id: 'EMP006', name: 'Ama Darko', department: 'IT', position: 'Web Developer', salary: 4200, status: 'active' },
            { id: 'EMP007', name: 'Kwesi Brown', department: 'Sales', position: 'Sales Executive', salary: 3500, status: 'active' },
            { id: 'EMP008', name: 'Yaa Asantewaa', department: 'Finance', position: 'Financial Analyst', salary: 4700, status: 'active' },
            { id: 'EMP009', name: 'Kofi Boateng', department: 'IT', position: 'Network Administrator', salary: 4300, status: 'active' },
            { id: 'EMP010', name: 'Efua Mensah', department: 'Human Resources', position: 'HR Assistant', salary: 3300, status: 'active' },
            { id: 'EMP011', name: 'John Quaye', department: 'Administration', position: 'Administrative Assistant', salary: 2800, status: 'inactive' },
            { id: 'EMP012', name: 'Grace Owusu', department: 'Finance', position: 'Accounts Clerk', salary: 3100, status: 'active' }
        ];
        
        let html = '';
        
        employees.forEach(employee => {
            const initials = employee.name.split(' ').map(n => n[0]).join('');
            const statusBadge = employee.status === 'active' ? 
                '<span class="badge badge-success">Active</span>' : 
                '<span class="badge badge-secondary">Inactive</span>';
            
            html += `
                <tr>
                    <td>${employee.id}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="avatar">${initials}</div>
                            <div>
                                <div class="fw-medium">${employee.name}</div>
                            </div>
                        </div>
                    </td>
                    <td class="d-none d-md-table-cell">${employee.department}</td>
                    <td class="d-none d-md-table-cell">${employee.position}</td>
                    <td>GH₵ ${formatMoney(employee.salary)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <a href="employee-view.html?id=${employee.id}" class="btn btn-sm btn-outline-primary" title="View">
                                <i class="bi bi-eye"></i>
                            </a>
                            <a href="employee-edit.html?id=${employee.id}" class="btn btn-sm btn-outline-secondary" title="Edit">
                                <i class="bi bi-pencil"></i>
                            </a>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
        
        // Show or hide the empty state
        const noEmployees = document.getElementById('noEmployees');
        if (noEmployees) {
            noEmployees.style.display = employees.length > 0 ? 'none' : 'block';
        }
    }
}

/**
 * Initialize charts for dashboard
 */
function initCharts() {
    // Monthly Payroll Trends Chart
    const payrollChartElement = document.getElementById('payrollChart');
    
    if (payrollChartElement) {
        new Chart(payrollChartElement, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'Gross Payroll',
                        data: [198500, 201300, 205800, 208200, 210500, 215000],
                        backgroundColor: 'rgba(0, 100, 0, 0.5)',
                        borderColor: 'rgba(0, 100, 0, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Net Payroll',
                        data: [158661, 160932, 164529, 166351, 168084, 171622],
                        backgroundColor: 'rgba(206, 17, 38, 0.5)',
                        borderColor: 'rgba(206, 17, 38, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (GH₵)'
                        }
                    }
                }
            }
        });
    }
    
    // Department Distribution Chart
    const departmentChartElement = document.getElementById('departmentChart');
    
    if (departmentChartElement) {
        new Chart(departmentChartElement, {
            type: 'doughnut',
            data: {
                labels: ['IT', 'Finance', 'Human Resources', 'Sales', 'Administration'],
                datasets: [{
                    data: [25, 20, 15, 25, 15],
                    backgroundColor: [
                        'rgba(0, 100, 0, 0.8)',
                        'rgba(25, 135, 84, 0.8)',
                        'rgba(206, 17, 38, 0.8)',
                        'rgba(252, 209, 22, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 100, 0, 1)',
                        'rgba(25, 135, 84, 1)',
                        'rgba(206, 17, 38, 1)',
                        'rgba(252, 209, 22, 1)',
                        'rgba(108, 117, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }
}

/**
 * Initialize employee search functionality
 */
function initEmployeeSearch() {
    const searchInput = document.getElementById('employeeSearch');
    const employeesTable = document.getElementById('employeesFullTable');
    const noResultsMessage = document.getElementById('noSearchResults');
    
    if (searchInput && employeesTable) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            const rows = employeesTable.querySelectorAll('tbody tr');
            let hasResults = false;
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const isMatch = text.includes(searchTerm);
                
                row.style.display = isMatch ? '' : 'none';
                
                if (isMatch) {
                    hasResults = true;
                }
            });
            
            // Show/hide no results message
            if (noResultsMessage) {
                noResultsMessage.style.display = (searchTerm !== '' && !hasResults) ? 'block' : 'none';
            }
        });
    }
}

/**
 * Ghana Tax Calculator Class
 */
class TaxCalculator {
    constructor() {
        // Tax brackets (Annual, GH₵)
        this.taxBrackets = [
            { limit: 4380, rate: 0 },
            { limit: 1320, rate: 0.05 },
            { limit: 1560, rate: 0.1 },
            { limit: 36000, rate: 0.175 },
            { limit: 196740, rate: 0.25 },
            { limit: Infinity, rate: 0.3 }
        ];
        
        // SSNIT contribution rates
        this.ssnitEmployeeRate = 0.055; // 5.5% employee contribution
        this.ssnitEmployerRate = 0.13;  // 13% employer contribution
        
        // Health insurance rate
        this.healthInsuranceRate = 0.025; // 2.5% of salary
        
        // Allowance rates
        this.transportAllowanceRate = 0.10; // 10% of basic salary
        this.housingAllowanceRate = 0.10;   // 10% of basic salary
    }
    
    /**
     * Calculate income tax based on Ghana's progressive tax system
     * @param {number} annualSalary Annual salary in GH₵
     * @returns {number} Tax amount in GH₵
     */
    calculateIncomeTax(annualSalary) {
        let taxableIncome = annualSalary;
        let taxAmount = 0;
        
        // Apply tax rates to corresponding income brackets
        for (let i = 0; i < this.taxBrackets.length; i++) {
            const bracket = this.taxBrackets[i];
            const taxableAmountInBracket = Math.min(taxableIncome, bracket.limit);
            
            taxAmount += taxableAmountInBracket * bracket.rate;
            taxableIncome -= taxableAmountInBracket;
            
            if (taxableIncome <= 0) break;
        }
        
        return taxAmount;
    }
    
    /**
     * Calculate SSNIT contribution
     * @param {number} monthlySalary Monthly salary in GH₵
     * @returns {number} SSNIT contribution amount in GH₵
     */
    calculateSSNITContribution(monthlySalary) {
        return monthlySalary * this.ssnitEmployeeRate;
    }
    
    /**
     * Calculate health insurance contribution
     * @param {number} monthlySalary Monthly salary in GH₵
     * @returns {number} Health insurance contribution amount in GH₵
     */
    calculateHealthInsurance(monthlySalary) {
        return monthlySalary * this.healthInsuranceRate;
    }
    
    /**
     * Calculate transport allowance
     * @param {number} basicSalary Basic salary in GH₵
     * @returns {number} Transport allowance amount in GH₵
     */
    calculateTransportAllowance(basicSalary) {
        return basicSalary * this.transportAllowanceRate;
    }
    
    /**
     * Calculate housing allowance
     * @param {number} basicSalary Basic salary in GH₵
     * @returns {number} Housing allowance amount in GH₵
     */
    calculateHousingAllowance(basicSalary) {
        return basicSalary * this.housingAllowanceRate;
    }
    
    /**
     * Calculate full payroll breakdown for an employee
     * @param {number} basicSalary Monthly basic salary in GH₵
     * @param {boolean} includeTransport Whether to include transport allowance
     * @param {boolean} includeHousing Whether to include housing allowance
     * @returns {Object} Object containing all payroll calculations
     */
    calculatePayroll(basicSalary, includeTransport = true, includeHousing = true) {
        // Calculate allowances
        const transportAllowance = includeTransport ? this.calculateTransportAllowance(basicSalary) : 0;
        const housingAllowance = includeHousing ? this.calculateHousingAllowance(basicSalary) : 0;
        
        // Calculate gross pay
        const grossPay = basicSalary + transportAllowance + housingAllowance;
        
        // Calculate deductions
        const ssnitContribution = this.calculateSSNITContribution(basicSalary);
        const healthInsurance = this.calculateHealthInsurance(basicSalary);
        
        // Calculate taxable income (annual)
        const annualTaxableIncome = (grossPay - ssnitContribution - healthInsurance) * 12;
        
        // Calculate income tax (monthly)
        const incomeTax = this.calculateIncomeTax(annualTaxableIncome) / 12;
        
        // Calculate total deductions
        const totalDeductions = ssnitContribution + healthInsurance + incomeTax;
        
        // Calculate net pay
        const netPay = grossPay - totalDeductions;
        
        return {
            basicSalary: formatMoney(basicSalary),
            transportAllowance: formatMoney(transportAllowance),
            housingAllowance: formatMoney(housingAllowance),
            grossPay: formatMoney(grossPay),
            ssnitContribution: formatMoney(ssnitContribution),
            healthInsurance: formatMoney(healthInsurance),
            incomeTax: formatMoney(incomeTax),
            totalDeductions: formatMoney(totalDeductions),
            netPay: formatMoney(netPay),
            annualGross: formatMoney(grossPay * 12),
            annualNet: formatMoney(netPay * 12)
        };
    }
}

/**
 * Format number as money
 * @param {number} amount Amount to format
 * @param {string} currency Currency symbol
 * @returns {string} Formatted money string
 */
function formatMoney(amount, currency = '') {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}