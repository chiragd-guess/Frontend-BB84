const steps = [
  {
    id: 1,
    title: "Preparing Photons",
    description: "Generating qubits" ,
  },
  {
    id: 2,
    title: "Sending Photons",
    description: "Quantum channel",
  },
  {
    id: 3,
    title: "Receiver Measuring",
    description: "Bob measures",
  },
  {
    id: 4,
    title: "Basis Comparison",
    description: "Compare bases",
  },
  {
    id: 5,
    title: "QBER Estimation",
    description: "Security check",
  },
  {
    id: 6,
    title: "Shared Key Generation",
    description: "Security key",
  },
  {
    id: 7,
    title: "Message Encryption",
    description: "Encrypting",
  },
  {
    id: 8,
    title: "Ciphertext Transmission",
    description: "Secure delivery",
  },
];

export default function ProgressTimeline({
  currentStage = 0,
  failed = false
}) {


  return (

    <ol className="progress-timeline">


      {
        steps.map((step)=>{


          const completed =
          step.id < currentStage;


          const active =
          step.id === currentStage;



          const failedStep =
failed && step.id >= 5;



          return (

            <li
            key={step.id}
            className={`
              progress-timeline__step
              ${completed ? "completed" : ""}
              ${active ? "active" : ""}
              ${failedStep ? "failed" : ""}
            `}
          >
            <div className="progress-step__icon">
              {failedStep
                ? "✕"
                : completed
                ? "✓"
                : active
                ? "●"
                : "○"}
            </div>
          
            <div className="progress-step__content">
    <h4>{step.title}</h4>

    <p className="progress-step__description">
        {step.description}
    </p>

    <span>
                {failedStep
                  ? "Aborted"
                  : completed
                  ? "Completed"
                  : active
                  ? "Running"
                  : "Waiting"}
              </span>
            </div>
          
            {step.id !== steps.length && (
              <div className="progress-step__line"></div>
            )}
          </li>

          );


        })

      }


    </ol>

  );

}