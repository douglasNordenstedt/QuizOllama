<template>
    <div class="p-4">

        <div v-if="page==='home'" class="flex flex-col xl:flex-row">
            <div>
                <div>
                    <h1 class="text-6xl italic text-myFour pt-10">Quiz Yourself With llama3.2</h1>
                    <div class="pt-12 flex flex-col sm:flex-row items-start">
                        <input type="text" v-model="topic" placeholder="Enter Topic" class="p-1 text-black rounded-xl mb-5" @keyup.enter="generateQuiz">
                        <button class="bg-myThree p-10 rounded-xl ml-10 text-2xl shadow-2xl shadow-myThree/25" @click="generateQuiz">Generate Quiz</button>
                    </div>
                </div>
                
                <div class="p-8 mt-10 bg-myTwo rounded-2xl max-w-3xl">
                    <h1 class="text-3xl mb-4:">Test your knowledge in this AI powered quiz</h1>
                    <ul class="pl-4">
                        <li>- Choose your own topic and generate a unique quiz</li>
                        <li>- Your answers will be graded and compared to how the AI answered</li>
                        <li>- Quality of questions might decline along with more niche topics</li>
                        <li>- Topics including profanity will be rejected</li>
                    </ul>
                </div>
            </div>

            <div>
                <div>
                    <img src="/ollama.svg" alt="SVG" class="opacity-40 xl:pl-20 pb-20 xl:pb-auto" style="padding-top:10%;" />
                </div>
            </div>
        </div>

        <div v-if="page==='loading'" class="flex justify-center items-center flex-col">
            <!--<icon name="svg-spinners:blocks-shuffle-3" style="color: #00ADB5;" size="400%"/>-->
            
            <iframe src="/loading.html" width="400px" height="400px" frameborder="none" scrolling="no" class="mr-5"></iframe>
            <div class="text-myThree pt-5 mx-auto text-3xl italic">
                <p>Prompting</p>
            </div>
        </div>

        <div v-if="page==='questions'">
            <div class="flex flex-col items-center min-h-screen">
                <div class="flex flex-col items-center text-6xl text-myThree pt-10 pb-10 italic">
                    <h1>{{ this.topic }} Quiz</h1>
                </div>
                <div class="flex flex-col items-center">
                    <h2 class="mb-3">{{ quizData[0].question }}</h2>
                    <input type="text" v-model="answerOne" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
                <div class="flex flex-col items-center">
                    <h2 class="mb-3">{{ quizData[1].question }}</h2>
                    <input type="text" v-model="answerTwo" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
                <div class="flex flex-col items-center">
                    <h2 class="mb-3">{{ quizData[2].question }}</h2>
                    <input type="text" v-model="answerThree" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
                <div class="flex flex-col items-center">
                <button class ="bg-myThree p-10 rounded-xl ml-10 text-2xl shadow-2xl shadow-myThree/25" @click="gradeQuiz">Grade Quiz</button>
                </div>
            </div>
            
        </div>

        <div v-if="page==='results'">
            <div>

            </div>
            <pre>{{ reprove }}</pre>
        </div>
    </div>
</template>

<script>

    export default{
        data() {
            return {
                page: "home",
                topic: null,
                quizData: "",
                answerOne: null,
                answerTwo: null,
                answerThree: null,
                reprove: "",                
            };
        },
        methods: {
            async generateQuiz() {
                this.quizData = null;
                this.page = "loading";
                
                try {
                    // Make an API call to the server-side route
                    const response = await fetch(`/api/generateQuestions?topic=${this.topic}`);
                    if (!response.ok) {
                        throw new Error('Failed to generate questions');
                    }
                    const data = await response.json();
                    this.quizData = data;
                } catch (error) {
                    console.error(error);
                    this.quizData = null;
                } finally {
                    this.page = "questions";
                }
            },
            async gradeQuiz() {
                this.page = "loading";

                let params = new URLSearchParams({
                    questionOne: this.quizData[0].question,
                    questionTwo: this.quizData[1].question,
                    questionThree: this.quizData[2].question,
                    answerOne: this.answerOne,
                    answerTwo: this.answerTwo,
                    answerThree: this.answerThree
                });

                console.log(`api/gradeQuestions?${params.toString()}`)
                try {
                    const response = await fetch (`api/gradeQuestions?${params.toString()}`)
                    if (!response.ok) {
                        throw new Error('Failed to grade questions');
                    }
                    const data = await response.json();
                    this.reprove = data;
                } catch(error) {
                    console.error(error);
                    this.reprove = null;
                } finally {
                    this.page = "results";
                }
                }
        }

    }
</script>