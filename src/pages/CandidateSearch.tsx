import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface.tsx';
//import SavedCandidates from './SavedCandidates.tsx';

const CandidateSearch = () => {
  const [singleCandidate, setSingleCandidate] = useState<Candidate>({name: '', image: '', location: '', email: '', company: '', bio: ''});  //single Candidate's info using the Candidate interface
  const [, setYesCandidates] = useState<Candidate[]>([]); //a list of Candidate objects that is stored into localStorage to generate the table on the Potential Candidates page
  const [message, setMessage] = useState<string>(""); //message that displays when there are no more candidates to view
  const [index, setIndex] = useState<number>(0); //index used when going thru each candidate 

  //const [formattedCandidate, setFormattedCandidate] = useState<Candidate>({name: '', image: '', location: '', email: '', company: '', bio: ''});
  //const [cardCandidates, setCardCandidates] = useState<Candidate[]>([]);

  //function fetches all the candidates from SearchGitHub API function and stores them into localStorage
  const fetchCandidateList = async() => {
    const candidates = await searchGithub()
    localStorage.setItem('candidateList', JSON.stringify(candidates));
  };

  //function reads the data from localStorage
  const loadData = (key: string) => {
    const itemList = localStorage.getItem(key);
    return itemList ? JSON.parse(itemList) : null; // Return null if the itemList doesn't exist
  };
  

  //function runs when page mounts
  useEffect(() => {
    const loadCandidates = async () => {
      localStorage.clear();    //clears localStorage 
      await fetchCandidateList();  //calls fetchCandidateList function
      const allCandidates = loadData('candidateList');  //reads the data from candidateList variable in localStorage

      //if statement to check if there is something in allCandidates list and populates the first candidate card on the site
      if (allCandidates && allCandidates.length > 0) {
        const getFirstCandidate = await searchGithubUser(allCandidates[0].login);
        setSingleCandidate({
          name: getFirstCandidate.login,
          image: getFirstCandidate.avatar_url,
          location: getFirstCandidate.location,
          email: getFirstCandidate.email,
          company: getFirstCandidate.company,
          bio: getFirstCandidate.bio,
        });

        //initializes the savedCandidate localStorage variable
        localStorage.setItem('savedCandidate', JSON.stringify([]));
        /*
        for(let i=0; i<allCandidates.length; i++) {
          const formatCandidate = await searchGithubUser(allCandidates[i].login);
          setFormattedCandidate((prev) => ({...prev, name: formatCandidate.login, image: formatCandidate.avatar_url ,location: formatCandidate.location, email: formatCandidate.email, company: formatCandidate.company, bio: formatCandidate.bio}));
          setCardCandidates((prevCandidates) => [...prevCandidates, formattedCandidate]);
          localStorage.setItem('cardCandidate', JSON.stringify(cardCandidates));
        } */
      } 
    };

    loadCandidates();  //calls the loadCandidates function
  }, []);


  //functions runs when the user presses the green plus button
  const handlePlusButtonClick = async () => {
    const allCandidates = loadData('candidateList'); //reads the data from candidateList variable in localStorage
  
    if (index < allCandidates.length) {
      setMessage(""); //resets the message to be empty string as the user has candidates to view
      const getUserCandidate = await searchGithubUser(allCandidates[index].login); //calls the searchGithubUser function on the currently displayed candidate
      //stores the current candidate into yesCandidates list of Candidate objects and stores it in localStorage
      setYesCandidates((prevCandidates) => {
        const updatedCandidates = [...prevCandidates, {
          name: getUserCandidate.login,
          image: getUserCandidate.avatar_url,
          location: getUserCandidate.location,
          email: getUserCandidate.email,
          company: getUserCandidate.company,
          bio: getUserCandidate.bio
        }];
        localStorage.setItem('savedCandidate', JSON.stringify(updatedCandidates)); 
        return updatedCandidates;   //returns the updated candidate state
      });
  
      const newIndex = index + 1;  //indexes to the next candidate
      if (newIndex < allCandidates.length) {
        setIndex(newIndex);   //updates index to newIndex
        const getNextCandidate = await searchGithubUser(allCandidates[newIndex].login);  //calls the searchGithubUser function on the next candidate
        setSingleCandidate({
          name: getNextCandidate.login,
          image: getNextCandidate.avatar_url,
          location: getNextCandidate.location,
          email: getNextCandidate.email,
          company: getNextCandidate.company,
          bio: getNextCandidate.bio
        });
      } else {
        setMessage("No more candidates to view! Please go to the Potential Candidates pages to see your saved candidates."); //throws error message saying no more candidates to view
      }
    } else {
      setMessage("No more candidates to view! Please go to the Potential Candidates pages to see your saved candidates."); //throws error message saying no more candidates to view
    }
  }
  
  //functions runs when the user presses the red minus button
  const handleMinusButtonClick = async () => {
    const allCandidates = loadData('candidateList'); //reads the data from candidateList variable in localStorage
    const newIndex = index + 1; //indexes to the next candidate
  
    if (newIndex < allCandidates.length) {
      setMessage("");   //resets the message to be empty string as the user has candidates to view
      const getUserCandidate = await searchGithubUser(allCandidates[newIndex].login);    //calls the searchGithubUser function on the next candidate
      setSingleCandidate({
        name: getUserCandidate.login,
        image: getUserCandidate.avatar_url,
        location: getUserCandidate.location,
        email: getUserCandidate.email,
        company: getUserCandidate.company,
        bio: getUserCandidate.bio
      });
      setIndex(newIndex); //updates index to newIndex
    } else {
      setMessage("No more candidates to view! Please go to the Potential Candidates pages to see your saved candidates.");  //throws error message saying no more candidates to view
    }
  }

  return (
    <>
      <h1>Candidate Search</h1>
      {/* Displays the error message only when message variable is not empty */}
      {message && <h2>{message}</h2>}
      {/* Candidate Card */}
      <div className="card">
        <div className="card-image">
            <img src={singleCandidate.image || 'https://avatars.githubusercontent.com/u/583231?v=4'} alt="Candidate's image" />
        </div>
        <div className="card-text">
            <h2>{singleCandidate.name || `GitHub User`}</h2>
            <p>Location: {singleCandidate.location || 'Not provided'}</p>
            <p>
              Email: <span style={{ color: 'blue' }}>{singleCandidate.email || `${singleCandidate.name}@github.com`}</span>
            </p>
            <p>Company: {singleCandidate.company || 'Not provided'}</p>
            <p>Bio: {singleCandidate.bio || 'Hi! Please check my repos to see the projects I have worked on.'}</p>
        </div>
      </div>
      {/* Red minus and green plus buttons below the candidate card */}
      <div className='buttons'>
        <button style = {{ background: 'red' }} onClick={handleMinusButtonClick}>-</button>
        <button style = {{ background: 'green' }} onClick={handlePlusButtonClick}>+</button>
      </div>
    </>

  );
};

export default CandidateSearch;
