import { beforeEach, expect, test } from '@jest/globals';
import { MockContext, Context, createMockContext } from "./context";
import { ping } from './functions';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
});

test('test ping 1', () => {
    let count = 0;
    mockCtx.prisma.counter.create.mockImplementation(() => {
        count++;
        return {} as unknown as any;
    });
    mockCtx.prisma.counter.count.mockImplementation(() => Promise.resolve(count) as unknown as any);

    ping(ctx.prisma).then((count) => {
        expect(count).toBe(100);
    });
});

test('test ping 3', () => {
    let count = 0;
    mockCtx.prisma.counter.create.mockImplementation(() => {
        count++;
        return {} as unknown as any;
    });
    mockCtx.prisma.counter.count.mockImplementation(() => Promise.resolve(count) as unknown as any);

    ping(ctx.prisma);
    ping(ctx.prisma);
    ping(ctx.prisma).then((count) => {
        expect(count).toBe(3);
    });
});