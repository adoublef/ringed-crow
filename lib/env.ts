/**
 * Env is a helper to get environment variable 
 */
export function env(key: string): string {
    const value = process.env[key]
    if (!value) {
        throw new ReferenceError(`error finding env variable for ${key}`)
    }
    return value
}