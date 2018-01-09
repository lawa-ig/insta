import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PicModal from './modal.jsx';

const PictureGrid = (props) => (
  <div className="grid-container">

    <Grid centered relaxed columns={3}>
      <Grid.Row>
        <Grid.Column>
          <PicModal img={'http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60'} />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
        <Grid.Column>
          <Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
        </Grid.Column>
      </Grid.Row>

    </Grid>

  </div>
  

    
);
  
export default PictureGrid;