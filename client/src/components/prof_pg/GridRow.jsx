import React from 'react';
import PicModal from './PictureModal.jsx';
import { Grid } from 'semantic-ui-react';

const GridRow = (props) => {
  return (
    <Grid.Row>
      {
        props.rowPics.map(photo => {
          return (
            <Grid.Column key={photo}>
              <PicModal className="grid-img" img={photo} />
            </Grid.Column>
          );
        })
      }
    </Grid.Row>
  );
};

export default GridRow;