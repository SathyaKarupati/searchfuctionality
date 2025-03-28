import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';

import Navbar from './component/Navbar'; // Adjusted path to match the correct location
import { store } from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline /> {/* Ensures consistent styling */}
        <BrowserRouter>
          <Navbar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;