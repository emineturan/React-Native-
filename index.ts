export interface Theme {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    card: string;
    border: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FFCC00',
    card: '#F2F2F7',
    border: '#C6C6C8'
  }
};

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#30D158',
    danger: '#FF453A',
    warning: '#FFD60A',
    card: '#1C1C1E',
    border: '#38383A'
  }
}; 