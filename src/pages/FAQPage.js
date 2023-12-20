import React from 'react';

const FAQPage = () => {
    return (
        <div className="container mt-5">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
                <div className="card mb-2">
                    <div className="card-header" id="question1">
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#answer1" aria-expanded="true" aria-controls="answer1">
                                What programming languages are popular in 2023?
                            </button>
                        </h2>
                    </div>

                    <div id="answer1" className="collapse show" aria-labelledby="question1" data-parent="#faqAccordion">
                        <div className="card-body">
                            As of 2023, popular programming languages include JavaScript, Python, Java, TypeScript, and Go, among others. The choice depends on the specific use case and project requirements.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="question2">
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#answer2" aria-expanded="true" aria-controls="answer2">
                                How can I secure my web applications?
                            </button>
                        </h2>
                    </div>

                    <div id="answer2" className="collapse" aria-labelledby="question2" data-parent="#faqAccordion">
                        <div className="card-body">
                            Securing web applications involves practices such as using HTTPS, input validation, implementing authentication and authorization, keeping software up to date, and conducting regular security audits.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
