
(function() {
    'use strict';

    // Attach the stuff
    window.generateMobaXtermSession = function(ip) {
        const sessionData = `ssh <sshlogin>@${ip}`;

        // Create a blob stuff
        const blob = new Blob([sessionData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a temp link
        const link = document.createElement('a');
        link.href = url;
        link.download = `ssh_${ip}.moba`;
        document.body.appendChild(link);
        link.click();

        // Clean up the stuff
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    };

    const checkForIP = setInterval(() => {
        const ipElements = document.querySelectorAll('.text-primary');
        ipElements.forEach(element => {
            const text = element.innerText.trim();
            const ipMatch = text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/); // extract
            if (ipMatch) {
                const ip = ipMatch[0]; // Get ip
                element.innerHTML = `
                <tr class="dafe-vpn text-primary" data-dafe-vpn-type="40">
                                <td><span class="glyphicon glyphicon-ok-sign success"></span>&nbsp;vpn.awse2b:</td>
                <td><a href="#" onclick="generateMobaXtermSession('${ip}')" style="color: blue; text-decoration: underline; cursor: pointer;">${ip}</a></td></tr>`;
                clearInterval(checkForIP); // Stop it
            }
        });
    }, 500); // Check every 500ms
})();

