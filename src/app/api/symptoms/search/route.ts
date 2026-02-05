import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ data: [] });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('symptoms')
        .select('id, name, body_system, severity_level')
        .ilike('name', `%${query}%`)
        .limit(20);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}
