// 颜色主题配置
// 每个主题包含：背景色、文字色、卡片背景色、强调色等

export const COLOR_THEMES = {
  // One Dark 主题
  'one-dark': {
    name: 'One Dark',
    background: '#282c34',
    foreground: '#abb2bf',
    card: '#21252b',
    primary: '#61afef',
    secondary: '#c678dd',
    accent: '#98c379',
    border: '#3e4451',
    muted: '#5c6370',
  },

  // Catppuccin Latte (浅色)
  'catppuccin-latte': {
    name: 'Catppuccin Latte',
    background: '#eff1f5',
    foreground: '#4c4f69',
    card: '#e6e9ef',
    primary: '#1e66f5',
    secondary: '#8839ef',
    accent: '#40a02b',
    border: '#acb0be',
    muted: '#6c6f85',
  },

  // Catppuccin Frappe
  'catppuccin-frappe': {
    name: 'Catppuccin Frappé',
    background: '#303446',
    foreground: '#c6d0f5',
    card: '#292c3c',
    primary: '#8caaee',
    secondary: '#ca9ee6',
    accent: '#a6d189',
    border: '#414559',
    muted: '#838ba7',
  },

  // Catppuccin Macchiato
  'catppuccin-macchiato': {
    name: 'Catppuccin Macchiato',
    background: '#24273a',
    foreground: '#cad3f5',
    card: '#1e2030',
    primary: '#8aadf4',
    secondary: '#c6a0f6',
    accent: '#a6da95',
    border: '#363a4f',
    muted: '#8087a2',
  },

  // Catppuccin Mocha (最深色)
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    card: '#181825',
    primary: '#89b4fa',
    secondary: '#cba6f7',
    accent: '#a6e3a1',
    border: '#313244',
    muted: '#7f849c',
  },

  // Dracula
  'dracula': {
    name: 'Dracula',
    background: '#282a36',
    foreground: '#f8f8f2',
    card: '#21222c',
    primary: '#8be9fd',
    secondary: '#bd93f9',
    accent: '#50fa7b',
    border: '#44475a',
    muted: '#6272a4',
  },

  // Nord
  'nord': {
    name: 'Nord',
    background: '#2e3440',
    foreground: '#eceff4',
    card: '#3b4252',
    primary: '#88c0d0',
    secondary: '#b48ead',
    accent: '#a3be8c',
    border: '#4c566a',
    muted: '#d8dee9',
  },

  // Gruvbox Dark
  'gruvbox-dark': {
    name: 'Gruvbox Dark',
    background: '#282828',
    foreground: '#ebdbb2',
    card: '#1d2021',
    primary: '#83a598',
    secondary: '#d3869b',
    accent: '#b8bb26',
    border: '#504945',
    muted: '#a89984',
  },

  // Gruvbox Light
  'gruvbox-light': {
    name: 'Gruvbox Light',
    background: '#fbf1c7',
    foreground: '#3c3836',
    card: '#ebdbb2',
    primary: '#076678',
    secondary: '#8f3f71',
    accent: '#79740e',
    border: '#bdae93',
    muted: '#665c54',
  },

  // Tokyo Night
  'tokyo-night': {
    name: 'Tokyo Night',
    background: '#1a1b26',
    foreground: '#c0caf5',
    card: '#16161e',
    primary: '#7aa2f7',
    secondary: '#bb9af7',
    accent: '#9ece6a',
    border: '#292e42',
    muted: '#565f89',
  },

  // Solarized Dark
  'solarized-dark': {
    name: 'Solarized Dark',
    background: '#002b36',
    foreground: '#839496',
    card: '#073642',
    primary: '#268bd2',
    secondary: '#d33682',
    accent: '#859900',
    border: '#586e75',
    muted: '#657b83',
  },

  // Solarized Light
  'solarized-light': {
    name: 'Solarized Light',
    background: '#fdf6e3',
    foreground: '#657b83',
    card: '#eee8d5',
    primary: '#268bd2',
    secondary: '#d33682',
    accent: '#859900',
    border: '#93a1a1',
    muted: '#839496',
  },

  // Material Dark
  'material-dark': {
    name: 'Material Dark',
    background: '#212121',
    foreground: '#eeffff',
    card: '#2c2c2c',
    primary: '#82aaff',
    secondary: '#c792ea',
    accent: '#c3e88d',
    border: '#3a3a3a',
    muted: '#676e95',
  },

  // Material Light
  'material-light': {
    name: 'Material Light',
    background: '#fafafa',
    foreground: '#90a4ae',
    card: '#ffffff',
    primary: '#6182b8',
    secondary: '#7c4dff',
    accent: '#91b859',
    border: '#e7eaec',
    muted: '#90a4ae',
  },

  // Ayu Dark
  'ayu-dark': {
    name: 'Ayu Dark',
    background: '#0a0e14',
    foreground: '#b3b1ad',
    card: '#0d1016',
    primary: '#39bae6',
    secondary: '#d2a6ff',
    accent: '#aad94c',
    border: '#11151c',
    muted: '#626a73',
  },

  // Ayu Light
  'ayu-light': {
    name: 'Ayu Light',
    background: '#fafafa',
    foreground: '#5c6166',
    card: '#ffffff',
    primary: '#399ee6',
    secondary: '#a37acc',
    accent: '#86b300',
    border: '#f0f0f0',
    muted: '#828c99',
  },

  // Monokai
  'monokai': {
    name: 'Monokai',
    background: '#272822',
    foreground: '#f8f8f2',
    card: '#1e1f1c',
    primary: '#66d9ef',
    secondary: '#ae81ff',
    accent: '#a6e22e',
    border: '#3e3d32',
    muted: '#75715e',
  },

  // GitHub Dark
  'github-dark': {
    name: 'GitHub Dark',
    background: '#0d1117',
    foreground: '#c9d1d9',
    card: '#161b22',
    primary: '#58a6ff',
    secondary: '#bc8cff',
    accent: '#56d364',
    border: '#30363d',
    muted: '#8b949e',
  },

  // GitHub Light
  'github-light': {
    name: 'GitHub Light',
    background: '#ffffff',
    foreground: '#24292f',
    card: '#f6f8fa',
    primary: '#0969da',
    secondary: '#8250df',
    accent: '#1a7f37',
    border: '#d0d7de',
    muted: '#57606a',
  },

  // Rosé Pine
  'rose-pine': {
    name: 'Rosé Pine',
    background: '#191724',
    foreground: '#e0def4',
    card: '#1f1d2e',
    primary: '#9ccfd8',
    secondary: '#c4a7e7',
    accent: '#ebbcba',
    border: '#26233a',
    muted: '#6e6a86',
  },

  // Rosé Pine Dawn (浅色)
  'rose-pine-dawn': {
    name: 'Rosé Pine Dawn',
    background: '#faf4ed',
    foreground: '#575279',
    card: '#fffaf3',
    primary: '#56949f',
    secondary: '#907aa9',
    accent: '#d7827e',
    border: '#f2e9e1',
    muted: '#9893a5',
  },
};

// 获取主题列表用于选择器
export const getThemeOptions = () => {
  return Object.keys(COLOR_THEMES).map(key => ({
    value: key,
    label: COLOR_THEMES[key].name,
    theme: COLOR_THEMES[key]
  }));
};

// 获取主题颜色
export const getThemeColors = (themeKey) => {
  return COLOR_THEMES[themeKey] || COLOR_THEMES['one-dark'];
};

