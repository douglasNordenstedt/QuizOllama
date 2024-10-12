<template>
    <div class="p-4">

        <div v-if="page==='home'" class="flex flex-col xl:flex-row">
            <div>
                <div>
                    <h1 class="text-6xl italic text-myFour pt-10">Quiz Yourself With llama3.2</h1>
                    <div class="pt-12 flex flex-col sm:flex-row items-start">
                        <input type="text" v-model="topic" placeholder="Enter Topic" class="p-1 text-black rounded-xl mb-5">
                        <button class ="bg-myThree p-10 rounded-xl ml-10 text-2xl shadow-2xl shadow-myThree/25" @click="generateQuiz">Generate Quiz</button>
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
            <div>
                <div>
                    <h2>{{ quizData[0].question }}</h2>
                    <input type="text" v-model="answerOne" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
                <div>
                    <h2>{{ quizData[1].question }}</h2>
                    <input type="text" v-model="answerTwo" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
                <div>
                    <h2>{{ quizData[2].question }}</h2>
                    <input type="text" v-model="answerThree" placeholder="" class="p-1 text-black rounded-xl mb-5">
                </div>
            </div>
            <div>
                <button class ="bg-myThree p-10 rounded-xl ml-10 text-2xl shadow-2xl shadow-myThree/25" @click="gradeQuiz">Grade Quiz</button>
            </div>
        </div>

        <div v-if="page==='results'">
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
                
                try {
                    const response = await fetch (`api/gradeQuestions?topic=pineapple&answers=${this.answerOne, this.answerTwo, this.answerThree}&questions=${this.quizData[0].question, this.quizData[1].question, this.quizData[0].question}`)
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