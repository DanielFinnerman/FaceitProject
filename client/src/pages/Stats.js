import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const Stats = () => (
  <Card className="segment centered" color='orange'>
    <Image src='https://cdn-frontend.faceit.com/web/96-1535731472/src/app/assets/images-compress/avatars/avatar_default_user_300x300.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>
        Daniel is a comedian living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
ASd
    </Card.Content>
  </Card>
)

export default Stats