import React, { useState, FormEvent } from 'react'
import { IThing } from '../../models/Thing'
import { Segment, Form, Button, Label } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    thing: IThing;
    createThing: (thing: IThing) => void;
    editThing: (thing: IThing) => void;
}

export const ThingForm: React.FC<IProps> = ({
    setEditMode,
    thing: originalThing,
    createThing,
    editThing
}) => {

    const setEditForm = () => {
        if (originalThing) {
            return originalThing
        } else {
            return {
                id: '',
                description: '',
                date: '',
                phoneNumber: ''
            };
        }
    };

    const [thing, setThing] = useState<IThing>(setEditForm);

    const submit = () => {
        if (thing.id.length === 0) {
            let newThing = {
                ...thing,
                id: uuid()
            }
            createThing(newThing)
        } else {
            editThing(thing)
        }
    }

    const update = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setThing({...thing, [name]: value})
    };

    return (
        <Segment clearning>
            <Form onSubmit={submit}>
            <Label>What toDo?</Label>
                <Form.TextArea 
                    onChange={update}
                    name='description'
                    rows={2}
                    palceholder='What To Do?'
                    value={thing.description}
                />
                <Label>When ToDO it?</Label>
                <Form.Input 
                    onChange={update}
                    type='datetime-local'
                    name='date'
                    palceholder='when to do it?'
                    value={thing.date}
                />
                <Label>Phone Number</Label>
                 <Form.Input 
                    onChange={update}
                    type='text'
                    name='phoneNumber'
                    value={thing.phoneNumber}
                />
                <Button
                    positive 
                    type='submit' 
                    content='Submit' 
                 />
                 <Button 
                    onClick={() => setEditMode(false)} 
                    floated='right' 
                    type='button' 
                    content='Cancel' 
                />
            </Form>
        </Segment>
    )
}
