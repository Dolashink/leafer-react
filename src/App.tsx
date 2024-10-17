import LeaferApp from './components/app';
import Leafer from './components/leafer'; 
import Frame from './components/frame';
import Rect from './components/rect';
import './App.css';

const App = () => {

  return (
    <div className="content">
      <LeaferApp>
        <Leafer>
          <Frame>
            <Rect x={100} y={100} width={200} height={200} fill={'red'} />
          </Frame>
        </Leafer> 
      </LeaferApp>
    </div>
  );
};

export default App;
