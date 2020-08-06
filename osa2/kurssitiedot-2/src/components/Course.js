import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    // const sum2 = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    // console.log('course: ', course)
    // console.log('course.parts: ', course.parts)
    // console.log('C.p.0.exercises: ', course.parts[0].exercises)
    // // öää ei tää toimi näin :D se tunkee ulos vaan objektii tjsp
    
  
    const sumWrong = course.parts.reduce(
      function (result, part) {
        console.log("tulos: ", result, " nykyobjekti: ", part, " currval.exercises: ", part.exercises)
        return result + part.exercises
      })
    console.log('sumWrong: ', sumWrong)
  
    const sum = course.parts.reduce(
      function (result, part) {
        return result + part.exercises
      }, 0)
  
    return(
      <h4>Number of exercises {sum}</h4>
    ) 
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(o =>
          <Part key={o.id} name={o.name} exercises={o.exercises} />
          )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
      </>
    )
  }

export default Course