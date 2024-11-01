// script.js

// Function to render the React component
function renderComponent() {
    const code = document.getElementById('code-input').value;
    const previewArea = document.getElementById('preview-area');

    // Clear previous content
    previewArea.innerHTML = '';

    try {
        // Remove import statements using regex
        const codeWithoutImports = code.replace(/import\s+.*from\s+['"].*['"];?/g, '');

        // Transpile JSX to JavaScript using Babel
        const transpiledCode = Babel.transform(codeWithoutImports, { presets: ['react'] }).code;

        // Evaluate the transpiled code to define the component
        // This will define 'App' in the global scope
        eval(transpiledCode);

        // Check if 'App' is defined
        if (typeof App !== 'function') {
            throw new Error('App component is not defined. Please ensure your main component is named "App".');
        }

        // Render the App component
        ReactDOM.render(React.createElement(App), previewArea);
    } catch (error) {
        // Display error message to the user within the preview area
        previewArea.innerHTML = `<pre style="color: red;">${error.message}</pre>`;
        console.error('Error rendering component:', error);
    }
}

// Add event listener to the Render button
document.getElementById('render-button').addEventListener('click', renderComponent);

// Optional: Render the default component on page load
window.onload = renderComponent;
