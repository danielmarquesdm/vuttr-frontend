import React from 'react';

export default function Form(){
    return (
        <form>
            <div>
                <label htmlFor='title'>Tool Name</label>
                <input type="text" name='title' placeholder='Tool Name' required/>
            </div>
            <div>
                <label htmlFor='link'>Tool Link</label>
                <input type="text" name='link' placeholder='link' required/>
            </div>
            <div>
                <label htmlFor='description'>Tool Description</label>
                <input type="text" name='description' placeholder='description' required/>
            </div>
            <div>
                <label htmlFor='tags'>Tags</label>
                <input type="text" name='tags' placeholder='tags' required/>
            </div>
            <button>Add Tool</button>
        </form>
    );
}