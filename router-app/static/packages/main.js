import { config } from './config.js';
import { getAppList, installApp, uninstallApp } from './electron.js';
let installedPackages = [];
let allPackages = [];
// Store for installed packages
// const installedPackages = [
//   { user: 'test', key: 'test-key', version: '1.0.0' },
//   { user: 'demo', key: 'demo-package', version: '1.2.0' },
// ];

// Function to fetch packages from API
async function fetchPackages() {
  try {
    // Currently using mock data
    // TODO: Uncomment the following code when API is ready
    const response = await fetch(config.appListUrl);
    const result = await response.json();
    if (result.code === 200) {
      return result.data;
    }
    throw new Error('Failed to fetch packages');
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

// Mock data for testing
const mockPackages = [
  {
    id: '1',
    title: 'Demo Package 1',
    description: 'A test package for demonstration',
    version: '1.0.0',
    user: 'test',
    key: 'test-key',
  },
  {
    id: '2',
    title: 'Demo Package 2',
    description: 'Another test package with updates',
    version: '2.0.0',
    user: 'demo',
    key: 'demo-package',
  },
  {
    id: '3',
    title: 'New Package',
    description: "A package that hasn't been installed yet",
    version: '1.0.0',
    user: 'demo',
    key: 'new-package',
  },
];

// Function to check if a package is installed
async function getPackageStatus(pkg) {
  const installed = installedPackages.find((p) => p.user === pkg.user && p.key === pkg.key);

  if (!installed) return 'not-installed';
  if (installed.version !== pkg.version) return 'update-available';
  return 'installed';
}

// Function to create a package card
async function createPackageCard(pkg) {
  const status = await getPackageStatus(pkg);
  const card = document.createElement('div');
  card.className = 'package-card';

  card.innerHTML = `
      <h2>${pkg.title}</h2>
      <p class="description">${pkg.description}</p>
      <div class="package-info">
          <span>Version: ${pkg.version}</span>
          <span>User: ${pkg.user}</span>
      </div>
      <div class="actions">
          ${getActionButton(status, pkg)}
          ${status !== 'not-installed' ? `<button class="button button-uninstall" onclick="handleUninstall('${pkg.id}')">Uninstall</button>` : ''}
      </div>
  `;

  return card;
}

// Function to get the appropriate action button based on status
function getActionButton(status, pkg) {
  switch (status) {
    case 'not-installed':
      return `<button class="button button-install" onclick="handleInstall('${pkg.id}')">Install</button>`;
    case 'update-available':
      return `<button class="button button-update" onclick="handleUpdate('${pkg.id}')">Update</button>`;
    case 'installed':
      return `<button class="button button-reinstall" onclick="handleReinstall('${pkg.id}')">Reinstall</button>`;
  }
}

// Action handlers
window.handleInstall = async (id) => {
  console.log('Installing package:', id);
  const pkg = allPackages.find((p) => p.id === id);
  if (pkg) {
    await installApp(pkg);
    renderPackages();
  }
};

window.handleUpdate = async (id) => {
  console.log('Updating package:', id);
  const pkg = allPackages.find((p) => p.id === id);
  if (pkg) {
    await installApp(pkg);
    renderPackages();
  }
};

window.handleReinstall = async (id) => {
  console.log('Reinstalling package:', id);
  const pkg = allPackages.find((p) => p.id === id);
  if (pkg) {
    await installApp(pkg);
    renderPackages();
  }
};

window.handleUninstall = async (id) => {
  console.log('Uninstalling package:', id);
  // const pkg = mockPackages.find((p) => p.id === id);
  const pkg = allPackages.find((p) => p.id === id);
  if (pkg) {
    // TODO: Replace with actual API call
    const index = installedPackages.findIndex((p) => p.user === pkg.user && p.key === pkg.key);
    await uninstallApp(pkg);
    if (index !== -1) {
      installedPackages.splice(index, 1);
      renderPackages();
    }
  }
};

// Render packages
async function renderPackages() {
  const packageList = document.getElementById('package-list');
  packageList.innerHTML = '';
  const installed = await getAppList();
  installedPackages = installed;
  for (const pkg of allPackages) {
    packageList.appendChild(await createPackageCard(pkg));
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  const packages = await fetchPackages();
  allPackages = packages;
  renderPackages();
});
