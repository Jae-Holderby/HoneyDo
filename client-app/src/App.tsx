import React, { useEffect, useState, Fragment } from 'react';
import { Container, Grid, Menu, Header} from 'semantic-ui-react';
import './App.css';
import { IThing } from './models/Thing';
import { ThingList } from './components/Things/ThingList';
import { ThingForm } from './components/Things/ThingForm';
import agent from './api/agent';

const App = () => {

  const [things, setThings] = useState<IThing[]>([]);
  const [selectedThing, setSelectedThing] = useState<IThing | null>(null);
  const [editMode, setEditMode] = useState(false);

  const selectThing = (id: string) => {
    setSelectedThing(things.filter(t => t.id === id)[0]);
  }

  const openForm = () => {
    setSelectedThing(null);
    setEditMode(true);
  };

  const createThing = (thing: IThing) => {
    agent.Things.create(thing).then(() =>{
      setThings([...things, thing]);
      setSelectedThing(thing);
      setEditMode(false);
    })
  };

  const editThing = (thing: IThing) => {
    agent.Things.update(thing).then(() => {
      setThings([...things.filter(t => t.id !== thing.id), thing]);
      setSelectedThing(thing);
      setEditMode(false);
    })
  };

  const deleteThing = (id: string) => {
    agent.Things.delete(id).then(() => {
      setThings([...things.filter(t => t.id !== id)]);
    })
  }

  useEffect(() => {
    agent.Things.list()
    .then((response) => {
      let things: IThing[] = [];
      response.forEach(thing => {
        thing.date = thing.date.split('.')[0]
        things.push(thing);
      })
      setThings(things)
    })
  }, []);

  return(
    <Fragment>
      <Menu fixed='top'>
        <Container>
          <Menu.Item>
            <Header>HoneyDo</Header>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{marginTop: "10em"}}>
        <Grid>
          <Grid.Column width={6}>
            <ThingList
              things={things}
              selectThing={selectThing}
              setEditMode={setEditMode}
              openForm={openForm}
              deleteThing={deleteThing}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            {editMode && (
            <ThingForm
              key={selectedThing && selectedThing.id || 0}
              setEditMode={setEditMode}
              thing={selectedThing!}
              createThing={createThing}
              editThing={editThing}
            />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </Fragment>
  ); 
}
export default App;
