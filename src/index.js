import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.js";
import { ServersProvider } from "./contexts/ServersContext.js";
import { FriendsProvider } from './contexts/FriendsContext';
import { PendingFriendsProvider } from './contexts/PendingFriendsContext';
import { ActiveProvider } from './contexts/ActiveContext';
import { OnlineUsersProvider } from './contexts/OnlineUsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <ActiveProvider>
      <OnlineUsersProvider>
        <ServersProvider>
          <FriendsProvider>
            <PendingFriendsProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PendingFriendsProvider>
          </FriendsProvider>
        </ServersProvider>
      </OnlineUsersProvider>
    </ActiveProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();