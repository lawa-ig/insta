import React from 'react';
import { Grid } from 'semantic-ui-react';
import GridRow from './GridRow.jsx';

const PictureGrid = (props) => (

  <div className="grid-container">
    <Grid centered columns={3}>
      {
        props.user.photos.map((photo, i, arr) => {
          if (i % 3 === 0) {
            return <GridRow key={props.user.photos[i]} rowPics={props.user.photos.slice(i, i + 3)}/>;
          }
        })
      }
    </Grid>
  </div>
    
);
  
export default PictureGrid;