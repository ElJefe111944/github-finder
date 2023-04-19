import React from 'react'

function About() {
  return (
    <div>
        <h1 className="text-6xl mb-4">Github Finder</h1>
        <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. The repository for this project can be found 
        in my GitHub repos&nbsp; 
        <strong>
          <a className='underline' target='_blank' href='https://github.com/ElJefe111944/github-finder'>here</a>
        </strong>
        .
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Layout By: <strong className='text-white'>James Farr</strong>
      </p>
    </div>
  )
}

export default About