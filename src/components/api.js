const baseUrl = 'https://judge0-ce.p.rapidapi.com';
export const fetchOutput = async (languageId, code) => {
    try {
        // STEP 1: Create the submission to get a token  
        const createSubUrl = `${baseUrl}/submissions?base64_encoded=false&wait=false`;
        
        const response = await fetch(createSubUrl, {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '52db68ee7cmshd960923644c1091p14b9dejsn69d79ee07c22',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id: parseInt(languageId),
                source_code: code,
                stdin: null
            })
        });

        console.log(response.status);

        if (!response.ok) {
            if(response.status === 429)
                alert('You have Reached the maximum code compilation attemps!😱');
            else
                alert('Something went wrong!😱');
            
            throw new Error(`Submitting failed: ${response.status}`);
        }

        const { token } = await response.json(); 
        console.log('token'+token);

        // STEP 2: Wait for Judge0 to compile (usually 1-2 seconds)
        // We poll the result using the token
        const resultUrl = `${baseUrl}/submissions/${token}?base64_encoded=false`;
        
        // Let's wait 2 seconds before checking
        await new Promise(resolve => setTimeout(resolve, 1500));

        const resultResponse = await fetch(resultUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '52db68ee7cmshd960923644c1091p14b9dejsn69d79ee07c22',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            }
        });

        const finalResult = await resultResponse.json();

        // Judge0 returns results in different fields:
        // stdout = success, stderr = code error, compile_output = compiler error
        return finalResult;

    } catch (error) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}