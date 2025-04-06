import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';
import { UAParser } from 'ua-parser-js';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = new Date();

    res.on('finish', () => {
        const endTime = new Date();
        const duration = endTime.getTime() - startTime.getTime();
        const logDate = startTime.toISOString().split('T')[0];
        const logFile = path.join(logsDir, `${logDate}.log`);

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
        const macAddress = req.headers['x-mac-address'] || 'Unknown MAC';
        const deviceName = req.headers['x-device-name'] || 'Unknown Device';
        const userAgentString = req.headers['user-agent'] || 'Unknown User-Agent';

        const parser = new UAParser(userAgentString);
        const uaResult = parser.getResult();

        const osType = uaResult.os.name || 'Unknown OS';
        const browser = uaResult.browser.name || 'Unknown Browser';
        const device = uaResult.device.model || 'Unknown Device';

        const logEntry = {
            time: startTime.toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            body: req.body,
            ip,
            macAddress,
            deviceName,
            userAgent: userAgentString,
            osType,
            browser,
            device,
        };

        // Colors
        const statusColor =
            res.statusCode >= 500
                ? chalk.red
                : res.statusCode >= 400
                    ? chalk.yellow
                    : res.statusCode >= 300
                        ? chalk.cyan
                        : chalk.green;

        const methodColor =
            req.method === 'GET'
                ? chalk.blue
                : req.method === 'POST'
                    ? chalk.magenta
                    : req.method === 'PUT'
                        ? chalk.yellowBright
                        : req.method === 'DELETE'
                            ? chalk.redBright
                            : chalk.white;

        // Terminal Log (single line)
        console.log(
            `${chalk.gray(`[${logEntry.time}]`)} ${methodColor(logEntry.method)} ${chalk.white(logEntry.url)} ` +
            `${statusColor(logEntry.status.toString())} ${chalk.gray(logEntry.duration)} ` +
            `🌐 IP: ${chalk.cyan(logEntry.ip)} ` +
            `📱 Device: ${chalk.magenta(logEntry.deviceName)} (${chalk.gray(logEntry.device)}) ` +
            `🔗 MAC: ${chalk.yellow(logEntry.macAddress)} ` +
            `💻 OS: ${chalk.greenBright(logEntry.osType)} ` +
            `🌍 Browser: ${chalk.whiteBright(logEntry.browser)} ` +
            `🧭 UA: ${chalk.gray(logEntry.userAgent)} ` +
            `📦 Body: ${chalk.whiteBright(JSON.stringify(logEntry.body))}`
        );

        // File log (colorless but formatted nicely, latest on top)
        const logString =
            `[${logEntry.time}] ${logEntry.method} ${logEntry.url} ${logEntry.status} ${logEntry.duration} ` +
            `IP: ${logEntry.ip} Device: ${logEntry.deviceName} (${logEntry.device}) MAC: ${logEntry.macAddress} ` +
            `OS: ${logEntry.osType} Browser: ${logEntry.browser} ` +
            `User-Agent: ${logEntry.userAgent} ` +
            `Request Body: ${JSON.stringify(logEntry.body)}\n`;

        fs.readFile(logFile, 'utf-8', (readErr, existingLogs = '') => {
            const updatedLogs = logString + existingLogs;
            fs.writeFile(logFile, updatedLogs, (writeErr) => {
                if (writeErr) {
                    console.error(chalk.red('Error writing log file:'), writeErr);
                }
            });
        });
    });

    next();
};

export default logger;
