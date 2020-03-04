import React from 'react'
import { IThing } from '../../models/Thing'
import { Segment, Button, Card } from 'semantic-ui-react'


interface IProps {
    things: IThing[];
    selectThing: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    openForm: () => void;
    deleteThing: (id: string) => void;
}

export const ThingList: React.FC<IProps> = ({
  things,
  selectThing,
  setEditMode,
  openForm,
  deleteThing,
}) => {
    return (
      <Segment clearing >
      <Button onClick={openForm}color='green'>Add A ToDo</Button>
      <Card.Group style={{marginTop: "1em"}}>
        {things.map(thing => (
          <Card key={thing.id}>
            <Card.Content>
              <Card.Header>{thing.description}</Card.Header>
              <Card.Description>
                {thing.date}
              </Card.Description>
                <Card.Meta>
                  {thing.phoneNumber}
                </Card.Meta>
            </Card.Content>
            <Button.Group>
              <Button
                onClick={() => {
                  selectThing (thing.id);
                  setEditMode(true);
                }}
                color='blue'
              >Edit</Button>
              <Button 
                onClick={() => {
                  deleteThing(thing.id);}}
                color='red'
              >Delete</Button>
            </Button.Group>
          </Card>
        ))}
        </Card.Group>
      </Segment>
    )
}
