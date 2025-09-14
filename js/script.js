document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  const themeLabel = document.querySelector('.theme-label');

  if (themeSwitch && themeLabel) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      themeSwitch.checked = true;
      themeLabel.textContent = 'Light Mode';
    }

    themeSwitch.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeLabel.textContent = 'Light Mode';
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeLabel.textContent = 'Dark Mode';
      }
    });
  }

  // Sidebar functionality
  const sidebar = document.querySelector('.sidebar');
  const sidebarIcons = document.querySelectorAll('.sidebar-icon');
  const panels = document.querySelectorAll('.panel');
  const panelCloseButtons = document.querySelectorAll('.panel-close');

  // Handle sidebar icon clicks
  sidebarIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      const panelName = this.getAttribute('data-panel');
      if (panelName === 'collapse') {
        sidebar.classList.toggle('collapsed');
        return;
      }

      const targetPanel = document.getElementById(`${panelName}-panel`);
      if (targetPanel) {
        sidebarIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        panels.forEach(panel => panel.classList.remove('active'));
        targetPanel.classList.add('active');
        sidebar.classList.remove('collapsed');
      }
    });
  });

  // Handle panel close buttons
  panelCloseButtons.forEach(button => {
    button.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
    });
  });

  // Handle task group and dashboard group toggles
  const groupHeaders = document.querySelectorAll('.menu-group-header');
  groupHeaders.forEach(header => {
    header.addEventListener('click', function () {
      this.classList.toggle('collapsed');
      const list = this.nextElementSibling;
      if (this.classList.contains('collapsed')) {
        list.style.display = 'none';
      } else {
        list.style.display = 'block';
      }
    });
  });
});
