import {useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [message, setMessage] = useState<string>(""); //message that displays when no candidates were saved to localStorage
  //function reads the data from localStorage
  const loadData = (key: string) => {
    const itemList = localStorage.getItem(key);
    return itemList ? JSON.parse(itemList) : null; // Return null if the itemList doesn't exist
  };

  //function runs when page mounts
  useEffect(() => {
    const savedCandidates = loadData('savedCandidate');   //reads the savedCandidate variable from localStroage
    const potTable = document?.querySelector('table')?.querySelector('tbody');  //grabs the tbody tag from the table

    //function that goes thru each Candidate object in the savedCandidates list and appends the info into the corresponding table cell which is then appended to a table row that is then appended to the body of the table
    const dataToTable = () => {
      setMessage(""); //resets the message to be empty string 
      if(savedCandidates.length === 0) {
        setMessage('No candidates have been accepted!')
      } else {
        for(let i = 0; i<savedCandidates.length; i++) {
          //creates a tr element and 7 td elements
          const tr = document.createElement('tr');
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          const td3 = document.createElement('td');
          const td4 = document.createElement('td');
          const td5 = document.createElement('td');
          const td6 = document.createElement('td');
          const td7 = document.createElement('td');
  
          //image tag for td1 and the corresponding CSS styles
          const imgTag = document.createElement('img');
          imgTag.width = 100;  
          imgTag.height = 100; 
          td1.style.textAlign = 'center';
  
  
          //reject button if user wants to remove candidate from table and the corresponding CSS styles
          const button = document.createElement('button');
          button.textContent = '-';
          button.style.backgroundColor = 'red';
  
          //adds the corresponding savedCandidates info into the correct td variable
          imgTag.src = savedCandidates[i].image || 'https://avatars.githubusercontent.com/u/583231?v=4'
          td1.appendChild(imgTag);
          td2.textContent = savedCandidates[i].name ? savedCandidates[i].name: 'GitHub User';
          td3.textContent = savedCandidates[i].location ? savedCandidates[i].location: 'Not provided';
          td4.textContent = savedCandidates[i].email ? savedCandidates[i].email: `${savedCandidates[i].name}@github.com`;
          td4.style.color = 'blue';
          td4.style.overflowWrap = 'break-word';
          td4.style.whiteSpace = 'normal';    
          td5.textContent = savedCandidates[i].company ? savedCandidates[i].company: 'Not provided';
          td6.textContent = savedCandidates[i].bio ? savedCandidates[i].bio: 'Hi! Please check my repos to see the projects I have worked on.';
          td7.appendChild(button);  //appends the button to td7
  
          //appending all td variables to tr variable
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          tr.appendChild(td7);
          potTable?.appendChild(tr);    //appends the tr variable to tbody
  
          //when the user clicks on the red minus button in the reject column
          button.onclick = () => {
            potTable?.removeChild(tr);   //removes the corresponding row where the button is from the table
            //updates the localStorage so when user reloads the table shows the current potential candidates 
            const updatedCandidates = savedCandidates.filter((_: any, ind: number) => ind!== i);
            localStorage.setItem('savedCandidate', JSON.stringify(updatedCandidates));
          };
        } 
      }
      
    };

    dataToTable();   //calls the function above
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* Initialize table with the header row and titles */}
      {/* Displays the error message only when no candidates were saved to localStorage */}
      {message && <h2>{message}</h2>}
      <table className="table">
        <thead>
        <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Location</td>
            <td>Email</td>
            <td>Company</td>
            <td>Bio</td>
            <td>Reject</td>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
