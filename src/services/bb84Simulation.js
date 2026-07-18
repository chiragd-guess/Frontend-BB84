const TOTAL_STAGES = 8;
const STAGE_DELAY_MS = 1800;
const ABORT_THRESHOLD = 11;


function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}


function createAbortMessage(qber) {
  return {
    id: Date.now(),
    sender: "system",
    time: timestamp(),
    text: `⚠ BB84 Protocol Aborted — Eve detected (QBER: ${qber}%). Shared key discarded. Message was NOT transmitted.`,
  };
}


export function runBB84Simulation(
  setSimulation,
  messageText,
  sender
) {

  let stage = 1;
  let aborted = false;
  setSimulation((s)=>({
    ...s,
    status:"running",
    protocol:{
      stage:0
    }
  }));


  const interval = setInterval(() => {


    if (aborted) return;


    setSimulation((s)=>({
      ...s,
      protocol:{
        stage
      }
    }));


    if(stage === 5){

      setTimeout(()=>{

        setSimulation((s)=>{

          const qber = s.channel.eve
            ? 25.0
            : parseFloat((Math.random()*3+1).toFixed(2));


          if(qber > ABORT_THRESHOLD){

            aborted = true;
            clearInterval(interval);


            return {
              ...s,
              status:"aborted",
              protocol:{
                stage:5
              },

              analytics:{
                qber,
                photonsSent:512,
                keyLength:0
              },

              session:{
                ...s.session,
                secure:false
              },


              messages:[
                ...s.messages,
                createAbortMessage(qber)
              ]

            };

          }


          return s;

        });


      },100);

    }



    stage++;


    if(stage > TOTAL_STAGES){

      clearInterval(interval);


      setSimulation((s)=>{

        const qber =
          parseFloat((Math.random()*3+1).toFixed(2));


        return {

          ...s,

          status:"completed",

          protocol:{
            stage:TOTAL_STAGES
          },


          bob:{
            ...s.bob,

            encryptedMessage:
              "110010101011001010101001",

            decryptedMessage:
              messageText

          },


          analytics:{
            qber,
            photonsSent:512,
            keyLength:256
          },


          session:{
            id:`QKD-${Date.now().toString().slice(-4)}`,
            secure:true,
            duration:"1.3 s"
          },


          messages:[
            ...s.messages,

            {
              id:Date.now(),
              sender,
              time:timestamp(),
              text:messageText
            }

          ]

        };

      });

    }


  },STAGE_DELAY_MS);

}